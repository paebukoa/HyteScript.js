// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [message, userId = d.author?.id, returnId = 'false'] = d.func.params.splits;

        if (message == undefined) return d.throwError.func(d, "message field is required")
        
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

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;

        let newMessage = await user.send(parsedMessage)

        return returnId === 'true' ? newMessage?.id : undefined;
}
};