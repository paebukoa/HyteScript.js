// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [message, channelId = d.channel?.id, returnId = "false"] = d.func.params.splits;

        if (message == undefined) return d.throwError.func(d, "message field is required")

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

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;
        let newMessage = await channel.send(parsedMessage)

        return returnId === "true" ? newMessage?.id : undefined
}
};