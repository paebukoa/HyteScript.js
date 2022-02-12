module.exports = async d => {
    let [message, embeds = "[]", channelId = d.channel?.id, returnId = "false"] = d.params.splits;

    let channel = d.client.channels.cache.get(channelId);
    if (!channel) return d.error.functionError(d, `channel ID "${channelId}" is invalid!`);

    try {
        embeds = JSON.parse(embeds);
    } catch (e) {
        return d.error.functionError(d, `embed creation failed: ${e}`);
    };

    let messageObj = {
        content: message,
        embeds: embeds
    };

    if (message.trim() === "") messageObj = {
        embeds: embeds
    };

    let messageSent = channel.send(messageObj);

    if (returnId.toLowerCase().trim() === "true") d.result = messageSent.id;
}