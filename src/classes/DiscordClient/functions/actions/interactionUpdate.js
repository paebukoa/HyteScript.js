const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Updates the message which sent interaction.',
    usage: 'message | replaceEmpty?',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent (support functions that sets a message option).',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Replace empty',
            description: 'Whether to replace empty fields, such as components, embed...',
            optional: 'true',
            defaultValue: 'false'
        },
    ],
    dontParse: [0],
    run: async (d, message, replaceEmpty = 'false') => {
        if (!['interaction', 'buttonInteraction', 'selectMenuInteraction', 'modalSubmitInteraction'].includes(d.eventType)) return new d.error("notAllowed", d, 'interaction, buttonInteraction, selectMenuInteraction or modalSubmitInteraction types')

        if (message == undefined) return new d.error("required", d, 'message')

        let updateObj = await parseMessage(d, message, replaceEmpty != 'true')
        if (!updateObj) return;

        await d.interaction.update(updateObj).catch(e => new d.error("custom", d, e.message))
}
};