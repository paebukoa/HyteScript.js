module.exports = {
    description: 'Sends a message to a channel.',
    usage: 'message | channelId? | returnId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message builder to be sent.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel to send message.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    parseParams: false,
    run: async (d, message, channelId = d.channel?.id, returnId = 'false') => {
        if (message == undefined) return d.throwError.required(d, "message")

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
        let newMessage = await channel.send(messageObj).catch(e => d.throwError.func(d, e.message))

        return returnId === "true" ? newMessage?.id : undefined
}
};