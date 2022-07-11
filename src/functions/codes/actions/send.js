module.exports = {
    parseParams: false,
    run: async (d, message, channelId = d.channel?.id, returnId = 'false') => {
        if (message == undefined) return d.throwError.func(d, "message field is required")

        if (typeof channelId === 'object') {
            let parsedChannelId = await channelId.parse(d)
            if (parsedChannelId.error) return;
            channelId = parsedChannelId.result
        }

        if (typeof returnId === 'object') {
            let parsedReturnId = await returnId.parse(d)
            if (parsedReturnId.error) return;
            returnId = parsedReturnId.result
        }

        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;
        let newMessage = await channel.send(messageObj)

        return returnId === "true" ? newMessage?.id : undefined
}
};