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
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let message = await channel.messages.fetch(messageId)
        if (!message) return new d.error("custom", d, 'invalid message ID or message is too old')

        await message.delete().catch(e => new d.error("custom", d, e.message))
    }
}