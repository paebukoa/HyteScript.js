const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Updates the message which sent interaction.',
    usage: 'message',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent (support functions that sets a message option).',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    dontParse: [0],
    run: async (d, message) => {
        if (!['interaction', 'buttonInteraction', 'selectMenuInteraction', 'modalSubmitInteraction'].includes(d.eventType)) return new d.error("notAllowed", d, 'interaction, buttonInteraction, selectMenuInteraction or modalSubmitInteraction types')

        if (message == undefined) return new d.error("required", d, 'message')

        let updateObj = await parseMessage(d, message)
        if (!updateObj) return;

        await d.interaction.update(updateObj).catch(e => new d.error("custom", d, e.message))
}
};