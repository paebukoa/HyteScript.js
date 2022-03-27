module.exports = async d => {
    let [property = 'id', channelId = d.channel?.id] = d.func.params.splits;

    const channelData = d.client.channels.cache.get(channelId);

    if (property === "exists") return channelData? true : false;

    if (!channelData) return d.throwError.invalid(d, 'channel ID', channelId);

    const acceptableData = {
        type: channelData.type,
        guildid: channelData.guildId,
        parentid: channelData.parentId,
        threadcount: channelData.threads.cache.size || 0,
        isnsfw: channelData === true? "true" : "false",
        id: channelData.id,
        name: channelData.name,
        lastmessageid: channelData.lastMessageId,
        createdtimestamp: channelData.createdTimestamp,
        position: channelData.rawPosition,
        recipient: channelData.recipient?.id
    };

    return acceptableData[property.toLowerCase()];
}