module.exports = async d => {
    let [property = 'id', channelId = d.channel?.id] = d.function.parameters;

    const channelData = d.client.channels.cache.get(channelId);

    if (property.toLowerCase() === "exists") return channelData? true : false;

    if (!channelData) return d.throwError.invalid(d, 'channel ID', channelId);

    return d.utils.getProperty('channel', channelData, property)
}