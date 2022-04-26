module.exports = async d => {
    let [messageId = d.message?.id, channelId = d.channel?.id] = d.func.params.splits;

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    let message = channel.messages.cache.get(messageId)
    if (!message) return d.throwError.invalid(d, 'message ID', messageId)

    message.delete()
};