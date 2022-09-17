const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property = 'id', messageId = d.message?.id, channelId = d.channel?.id) => {
        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let message = await channel.messages.fetch(messageId)
        
        if (property.toLowerCase() === 'exists') return !!message

        return getProperty('message', message, property)
    }
};