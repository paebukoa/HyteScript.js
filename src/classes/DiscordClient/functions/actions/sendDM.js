const { parseMessage } = require("../../utils/utils");

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
    dontParse: [0],
    run: async (d, message, userId = d.author?.id, returnId = 'false') => {
        if (message == undefined) return new d.error("required", d, "message")
        
        if (typeof userId === 'object') {
            let parseduserId = await userId.parse(d)
            if (parseduserId.err) return;
            userId = parseduserId.result
        }

        if (typeof returnId === 'object') {
            let parsedreturnId = await returnId.parse(d)
            if (parsedreturnId.err) return;
            returnId = parsedreturnId.result
        }

        const user = d.client.users.cache.get(userId);
        if (!user) return new d.error("invalid", d, 'user ID', userId);

        let messageObj = await parseMessage(d, message)
        if (messageObj.error) return;
        let newMessage = await user.send(messageObj).catch(e => new d.error("custom", d, e.message))

        return returnId === 'true' ? newMessage?.id : undefined;
}
};