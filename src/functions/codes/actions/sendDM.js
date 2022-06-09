// dontParseParams

module.exports = async d => {
    let [code, userId = d.author?.id, returnId = 'false'] = d.func.params.splits;

    if (code?.trim?.() === '') return d.throwError.func(d, "text/code field is required")
    
    if (userId.includes("#")) {
        let parsedUserId = await d.reader.default(d, userId);
        if (parsedUserId?.error) return;
        
        userId = parsedUserId.result.unescape();
    };
    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId);
        if (parsedReturnId?.error) return;
        
        returnId = parsedReturnId.result.unescape();
    };

    const user = d.client.users.cache.get(userId);
    if (!user) return d.throwError.invalid(d, 'user ID', userId);

    let newMessage = await d.sendParsedMessage(d, code, user)

    return returnId === 'true' ? newMessage?.id : undefined;
};