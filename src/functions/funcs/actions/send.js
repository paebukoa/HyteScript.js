module.exports = async d => {
    let [message, embeds = "[]", channelId = d.channel?.id, returnId = "false"] = d.params.splits;

    let channel = d.client.channels.cache.get(channelId);
    if (!channel) return d.error.functionError(d, `channel ID "${channelId}" is invalid!`);

    if (embeds === '') embeds = "[]";

    try {
        embeds = JSON.parse(embeds);
    } catch (e) {
        return d.error.functionError(d, `embed creation failed: ${e}`);
    };

    let messageData = {};
    if (message.replace('\n', '').trim() !== '') messageData.content = message;
    if (embeds !== []) messageData.embeds = embeds;

    let messageSent = channel.send(messageData);
    d.result = returnId === "true" ? messageSent.id : undefined;
}