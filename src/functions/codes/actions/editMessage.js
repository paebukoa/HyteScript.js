module.exports = {
    description: 'Edits a client message.',
    usage: 'message | messageId | channelId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message to replace the old message (supports functions that set a message option).',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Message ID',
            description: 'The message ID to be edited.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the message belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    parseParams: false,
    run: async (d, message, messageId, channelId = d.channel?.id) => {
        if (message == undefined) return d.throwError.required(d, 'message')
        if (messageId == undefined) return d.throwError.required(d, 'message ID')

        if (typeof messageId === 'object') {
            let parsedmessageId = await messageId.parse(d)
            if (parsedmessageId.error) return;
            messageId = parsedmessageId.result
        }

        if (typeof channelId === 'object') {
            let parsedchannelId = await channelId.parse(d)
            if (parsedchannelId.error) return;
            channelId = parsedchannelId.result
        }

        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        const clientMessage = channel.messages.cache.get(messageId)
        if (!clientMessage) return d.throwError.func(d, 'invalid message ID or message is not cached')

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;

        await clientMessage.edit(messageObj)
    }
}