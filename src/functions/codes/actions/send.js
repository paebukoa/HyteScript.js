// dontParseParams

module.exports = async d => {
    let [code, channelId = d.channel?.id, returnId = "false"] = d.func.params.splits;

    if (code?.trim?.() === '') return d.throwError.func(d, "text/code field is required")

    if (channelId.includes("#")) {
        parsedChannelId = await d.reader.default(d, channelId)
        if (parsedChannelId.error) return;

        channelId = parsedChannelId.result.unescape()
    }

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        if (parsedReturnId.error) return;

        returnId = parsedReturnId.result.unescape()
    }

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    let embeds = JSON.stringify(d.data.embeds)
    let components = JSON.stringify(d.data.components)
    d.data.embeds = []
    d.data.components = []

    let readerData = await d.reader.default(d, code)
    if (readerData.error) return;

    let newEmbeds = readerData.data.embeds
    let newComponents = readerData.data.components

    d.data.embeds = JSON.parse(embeds)
    d.data.components = JSON.parse(components)
    
    let messageObj = {
        content: readerData.result.unescape(),
        embeds: newEmbeds,
        components: newComponents
    }

    if (JSON.stringify(messageObj.embeds) === '[]' && JSON.stringify(messageObj.components) === '[]' && messageObj.content.replaceAll('\n', '').trim() === '') return;
    
    let newMessage = await channel.send(messageObj).catch(e => {
        return d.throwError.func(d, `failed to send message: ${e}`)
    }) 

    return returnId === "true" ? newMessage?.id : undefined
};