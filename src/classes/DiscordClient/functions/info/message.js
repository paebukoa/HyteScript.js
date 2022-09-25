const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property = 'id', messageId = d.message?.id, channelId = d.channel?.id) => {
        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let messages = await channel.messages.fetch()
        let message = messages.get(messageId)
        
        if (property.toLowerCase() === 'exists') return !!message

        return getProperty('message', message, property)
    }
};