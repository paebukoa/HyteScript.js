module.exports = async d => {
    let [property = "id", channelId = d.channel?.id] = d.params.splits;

    const channelData = d.client.channels.cache.get(channelId);

    if (property === "exists") {
        d.result = channelData?true:false;
        return;
    };

    if (!channelData) return d.error.invalidError(d, "channel ID", channelId);

    const acceptableData = {
        type: channelData.type,
        guildid: channelData.guildId,
        parentid: channelData.parentId,
        threadcount: channelData.threads.cache.size || 0,
        nsfw: channelData === true? "true" : "false",
        id: channelData.id,
        name: channelData.name,
        lastmessageid: channelData.lastMessageId,
        createdtimestamp: channelData.createdTimestamp,
        position: channelData.rawPosition,
        recipient: channelData.recipient?.id
    };

    d.result = acceptableData[property.toLowerCase()];

}