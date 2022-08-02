module.exports = {
    description: 'Replies to the interaction.',
    usage: 'message | ephemeral? | returnId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent (support functions that sets a message option).',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Ephemeral',
            description: 'Whether to send a message that only interaction author can see or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Return ID',
            description: 'Whether to return the interaction reply message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    parseParams: false,
    run: async (d, message, ephemeral = 'false', returnId = 'false') => {
        if (!d.interaction) return d.throwError.allow(d)

        if (message == undefined) return d.throwError.required(d, 'message')

        if (typeof ephemeral === 'object') {
            let parsedEphemeral = await ephemeral.parse(d)
            if (parsedEphemeral.error) return;
            ephemeral = parsedEphemeral.result
        }

        if (typeof returnId === 'object') {
            let parsedReturnId = await returnId.parse(d)
            if (parsedReturnId.error) return;
            returnId = parsedReturnId.result
        }

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;
        
        messageObj.ephemeral = ephemeral === 'true'

        let newMessage = await d.interaction.reply(messageObj).catch(e => d.throwError.func(d, e.message))

        return returnId === "true" ? newMessage?.id : undefined
    }
};