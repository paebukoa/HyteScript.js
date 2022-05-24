module.exports = async d => {
    let [property = 'id', messageId = d.message?.id, channelId = d.channel?.id] = d.func.params.splits;

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    let message = channel.messages.cache.get(messageId)
    
    if (property.toLowerCase() === 'exists') return message ? true : false
    
    if (!message) return d.throwError.func(d, `invalid message ID or message is too old`)

    return d.properties.message(message, property)
};