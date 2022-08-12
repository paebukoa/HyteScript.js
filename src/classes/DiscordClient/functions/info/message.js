module.exports = async d => {
    let [property = 'id', messageId = d.message?.id, channelId = d.channel?.id] = d.function.parameters;

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

    let message = await channel.messages.fetch(messageId)
    
    if (property.toLowerCase() === 'exists') return !!message

    return d.properties.message(message, property)
};