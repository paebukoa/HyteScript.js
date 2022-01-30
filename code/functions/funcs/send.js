module.exports = async d => {
    let [message, channelId = d.message.channel?.id, returnId] = d.inside.splits;
    const channel = d.client.channels.cache.get(channelId);
    if (!channel) d.error.set.newError(d, "function", `Invalid channel ID "${channelId}" provided.`); 
    else channel.send(message);
    d.result = "";
}