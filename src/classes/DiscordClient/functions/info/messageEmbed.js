const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Gets an embed property from a message.',
    usage: 'index | property | messageId? | channelId?',
    parameters: [
        {
            name: 'Index',
            description: 'Embed index.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The embed property to be returned.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Message ID',
            description: 'The embed message.',
            optional: 'true',
            defaultValue: 'Command message ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the message belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    async run (d, index, property, messageId = d.message?.id, channelId = d.channel?.id) {
        if (index == undefined) return new d.error("required", d, 'index')
        if (property == undefined) return new d.error("required", d, 'property')

        if (isNaN(index) || Number(index) <= 0) return new d.error('invalid', d, 'index number', index)
        
        index = Number(index) - 1

        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error('invalid', d, 'channel ID', channelId)

        const messages = await channel.messages.fetch()
        const message = messages.get(messageId)
        if (!message) return new d.error('invalid', d, 'message ID', messageId)

        return getProperty('messageEmbed', message, property, index)
    }
};