// dontParseParams

module.exports = async d => {
    let [code, channelId = d.channel?.id, returnId = 'false'] = d.func.params.splits;

    if (channelId.includes("#")) {
        let parsedChannelId = await d.reader.default(d, channelId);
        channelId = parsedChannelId.result;
    };
    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId);
        returnId = parsedReturnId.result;
    };

    const channel = d.client.channels.cache.get(channelId);
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId);

    let embeds = JSON.stringify(d.data.embeds);
    let readerData = await d.reader.default((d), code);
    let newEmbeds = JSON.stringify(readerData.data.embeds);
    d.data.embeds = JSON.parse(embeds);
    
    let messageObj = {
        content: readerData.result,
        embeds: JSON.parse(newEmbeds)
    };
    if (readerData.result.replaceAll('\n', '').trim() === '') delete messageObj.content;
    
    if (JSON.stringify(readerData.data.embeds) === "[]" && readerData.result.replaceAll('\n', '').trim() === '') return;
    
    let newMessage = await channel.send(messageObj);

    if (returnId === "true") return newMessage.id;
};