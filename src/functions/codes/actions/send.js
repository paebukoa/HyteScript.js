// dontParseParams

module.exports = async d => {
    let [code, channelId = d.channel?.id, returnId = "false"] = d.func.params.splits;

    if (code == undefined) return d.throwError.func(d, "message field is required")

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

    let newMessage = await d.sendParsedMessage(d, code, channel)

    return returnId === "true" ? newMessage?.id : undefined
};