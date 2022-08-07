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
    dontParse: [0],
    run: async (d, message, ephemeral = 'false', returnId = 'false') => {
        if (!d.interaction) return d.throwError.notAllowed(d, 'interaction type')

        if (message == undefined) return d.throwError.required(d, 'message')

        if (d.interaction.replied) return d.throwError.func(d, 'that interaction already have been replied. Use #(interactionFollowUp) to send another reply.')

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;
        
        messageObj.ephemeral = ephemeral === 'true'

        let newMessage = await d.interaction.reply(messageObj).catch(e => d.throwError.func(d, e.message))

        return returnId === "true" ? newMessage?.id : undefined
    }
};