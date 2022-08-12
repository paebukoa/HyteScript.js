const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Sends a follow up reply; another reply after interaction get replied.',
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
            description: 'Whether to return the interaction follow up reply message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    dontParse: [0],
    run: async (d, message, ephemeral = 'false', returnId = 'false') => {
        if (!d.interaction) return new d.error("notAllowed", d, 'interaction type')

        if (message == undefined) return new d.error("required", d, 'message')

        let messageObj = await parseMessage(d, message)
        if (messageObj.error) return;
        
        messageObj.ephemeral = ephemeral === 'true'

        let newMessage = await d.interaction.followUp(messageObj).catch(e => new d.error("custom", d, e.message))

        return returnId === "true" ? newMessage?.id : undefined
    }
};