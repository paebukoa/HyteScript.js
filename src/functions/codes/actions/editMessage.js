module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async d => {
        let [message, messageId, channelId = d.channel?.id] = d.func.params.splits;

        if (message == undefined) return d.throwError.func(d, 'message field is required')
        if (messageId == undefined) return d.throwError.func(d, 'message ID field is required')

        parsedChannelId = await d.reader.default(d, channelId)
        if (parsedChannelId?.error) return;
    
        channelId = parsedChannelId.result.unescape()

        parsedMessageId = await d.reader.default(d, messageId)
        if (parsedMessageId?.error) return;
    
        messageId = parsedMessageId.result.unescape()

        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        const clientMessage = channel.messages.cache.get(messageId)
        if (!clientMessage) return d.throwError.func(d, 'invalid message ID or message is too old')

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;

        delete parsedMessage.reply

        clientMessage.edit(parsedMessage)
    }
}