module.exports = async d => {
    let [message, channelId = d.message.channel?.id, returnId] = d.inside.splits;
    const channel = d.client.channels.cache.get(channelId);
    if (!channel) {
        const err = new d.error.SetError(d, "function", `Invalid channel ID: ${channelId}`);
    }
    channel.send(message);
    d.result = "";
}