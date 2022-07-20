module.exports = {
    description: 'Deletes a message by ID.',
    usage: 'messageId? | channelId?',
    parameters: [
        {
            name: 'Message ID',
            description: 'The message to be deleted.',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the message belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID.'
        }
    ],
    run: async (d, messageId = d.message?.id, channelId = d.channel?.id) => {
        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        let message = channel.messages.cache.get(messageId)
        if (!message) return d.throwError.func(d, 'invalid message ID or message is too old')

        message.delete()
    }
}