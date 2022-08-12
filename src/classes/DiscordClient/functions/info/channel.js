const { getProperty } = require("../../utils/utils");

module.exports = async d => {
    let [property = 'id', channelId = d.channel?.id] = d.function.parameters;

    const channelData = d.client.channels.cache.get(channelId);

    if (property.toLowerCase() === "exists") return channelData? true : false;

    if (!channelData) return new d.error("invalid", d, 'channel ID', channelId);

    return getProperty('channel', channelData, property)
}