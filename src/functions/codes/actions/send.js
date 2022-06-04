// dontParseParams

module.exports = async d => {
    let [code, channelId = d.channel?.id, returnId = "false"] = d.func.params.splits;

    if (code?.trim?.() === '') return d.throwError.func(d, "text/code field is required")

    if (channelId.includes("#")) {
        parsedChannelId = await d.reader.default(d, channelId)
        if (parsedChannelId?.error) return;

        channelId = parsedChannelId.result.unescape()
    }

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        if (parsedReturnId?.error) return;

        returnId = parsedReturnId.result.unescape()
    }

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    let embeds = JSON.stringify(d.data.embeds)
    let components = JSON.stringify(d.data.components)
    let messageReply = d.data.messageToReply
    d.data.embeds = []
    d.data.components = []
    d.data.messageToReply = undefined

    let readerData = await d.reader.default(d, code)
    if (readerData?.error) return;

    let newEmbeds = readerData.data.embeds
    let newComponents = readerData.data.components
    let newMessageReply = readerData.data.messageToReply

    d.data.embeds = JSON.parse(embeds)
    d.data.components = JSON.parse(components)
    d.data.messageToReply = messageReply
    
    let messageObj = {
        reply: {
            messageReference: newMessageReply,
            failIfNotExists: false
        },
        content: readerData.result.unescape(),
        embeds: newEmbeds,
        components: newComponents
    }

    if (messageObj.content.replaceAll('\n', '').trim() === '') delete messageObj.content;

    if (JSON.stringify(messageObj.embeds) === '[]' && JSON.stringify(messageObj.components) === '[]' && messageObj.content == undefined) return;
    
    let newMessage = await channel.send(messageObj).catch(e => {
        return d.throwError.func(d, `failed to send message: ${e}`)
    }) 

    return returnId === "true" ? newMessage?.id : undefined
};