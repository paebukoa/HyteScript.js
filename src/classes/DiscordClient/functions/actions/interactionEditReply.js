const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Edits the interaction reply.',
    usage: 'newMessage',
    parameters: [
        {
            name: 'New message',
            description: 'The message to replace old message (support functions that sets a message option).',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    dontParse: [0],
    run: async (d, message) => {
        if (!d.interaction) return new d.error("notAllowed", d, 'interaction type')

        if (message == undefined) return new d.error("required", d, 'message')

        let messageObj = await parseMessage(d, message)
        if (messageObj.error) return;

        await d.interaction.editReply(messageObj).catch(e => new d.error("custom", d, e.message))
}
};