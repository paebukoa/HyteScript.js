module.exports = async d => {
    let [property, channelId = d.channel?.id] = d.params.splits;

    const channelData = d.client.channels.cache.get(channelId);

    if (property === "exists") {
        d.result = channelData?true:false;
        return;
    };

    if (!channelData) return d.error.invalidError(d, "channel ID", channelId);

    if (Array.isArray((channelData[property]))) {
        d.result = channelData[property].flat(Infinity).join(",");
        return;
    }

    d.result = channelData[property];

}