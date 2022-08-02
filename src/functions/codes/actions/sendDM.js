module.exports = {
    description: 'Sends a message to an user DM.',
    usage: 'message | userId? | returnId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message builder to be sent.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'User ID',
            description: 'The user to send DM.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    parseParams: false,
    run: async (d, message, userId = d.author?.id, returnId = 'false') => {
        if (message == undefined) return d.throwError.required(d, "message")
        
        if (typeof userId === 'object') {
            let parseduserId = await userId.parse(d)
            if (parseduserId.error) return;
            userId = parseduserId.result
        }

        if (typeof returnId === 'object') {
            let parsedreturnId = await returnId.parse(d)
            if (parsedreturnId.error) return;
            returnId = parsedreturnId.result
        }

        const user = d.client.users.cache.get(userId);
        if (!user) return d.throwError.invalid(d, 'user ID', userId);

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;
        let newMessage = await user.send(messageObj).catch(e => d.throwError.func(d, e.message))

        return returnId === 'true' ? newMessage?.id : undefined;
}
};