// dontParseParams

module.exports = async d => {
    let [code, userId = d.author?.id, returnId = 'false'] = d.func.params.splits;

    if (userId.includes("#")) {
        let parsedUserId = await d.reader.default(d, userId);
        userId = parsedUserId.result;
    };
    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId);
        returnId = parsedReturnId.result;
    };

    const user = d.client.users.cache.get(userId);
    if (!user) return d.throwError.invalid(d, 'user ID', userId);

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
    
    let newMessage = await user.send(messageObj).catch(e => {
        return d.throwError.func(d, `failed to send message: ${e}`)
    });

    if (returnId === "true") return newMessage.id;
};