module.exports = async d => {
    let [channelId, message, ...embed] = d.inside.splits;
    const returnId = embed.pop();
    embed = embed.join("/");
    const channel = d.client.channels.cache.get(channelId);
    if (!channel) {
        d.error.set.newError(d, "function", `Invalid channel ID "${channelId}" provided.`);
        return;
    }
    if (!message || message === "") {
        d.error.set.newError(d, 'function', `Field "message" must be filled.`);
        return;
    }
    const messageSent = channel.send(message);

    if (returnId == "true") {
        d.result = messageSent.id;
    }
}