module.exports = async d => {
    let [channelId = d.channel?.id] = d.func.params.splits;

    const channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    channel.delete()
};