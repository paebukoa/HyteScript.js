const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a channel property.',
    usage: 'property? | channelId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from channel.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Channel ID',
            description: 'The channel to get property.',
            optional: 'true',
            defaultValue: ''
        }
    ],
    run: async (d, property = 'id', channelId = d.channel?.id) => {
        const channelData = d.client.channels.cache.get(channelId);

        if (property.toLowerCase() === "exists") return channelData? true : false;

        if (!channelData) return new d.error("invalid", d, 'channel ID', channelId);

        return getProperty('channel', channelData, property)
}}