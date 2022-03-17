module.exports = async d => {
    let [message, channelId = d.channel?.id, returnId = "false"] = d.params.splits;

    let channel = d.client.channels.cache.get(channelId);
    if (!channel) return d.error.functionError(d, `channel ID "${channelId}" is invalid!`);

    const utils = JSON.stringify(d.utils);

    const readData = new d.reader((d), message, true);
    
    d.utils = JSON.parse(utils);
    
    if (readData.err) return;


    let messageData = {
        content: d.prots.unescape(readData.result), 
        embeds: readData.utils.embeds
    };

    if (readData.result.replace('\n', '').trim() === '') mesageData = {
        embeds: readData.utils.embeds
    };

    if (JSON.stringify(readData.utils.embeds) === "[]" && readData.result.replace('\n', '').trim() === '') return;

    let newMessage = channel.send(messageData);

    if (returnId === "true") d.result = newMessage.id;
};