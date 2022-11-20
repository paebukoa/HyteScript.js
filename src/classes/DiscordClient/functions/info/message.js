const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a message property.',
    usage: 'property? | messageId? | channelId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from message.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Message ID',
            description: 'The message which property will be get.',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel that the message belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    run: async (d, property = 'id', messageId = d.message?.id, channelId = d.channel?.id) => {
        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let messages = await channel.messages.fetch()
        let message = messages.get(messageId)
        
        if (property.toLowerCase() === 'exists') return !!message

        return getProperty('message', message, property)
    }
};