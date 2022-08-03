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
    parseParams: false,
    run: async (d, message) => {
        if (!d.interaction) return d.throwError.notAllowed(d, 'interaction type')

        if (message == undefined) return d.throwError.required(d, 'message')

        let messageObj = await d.utils.parseMessage(d, message)
        if (!messageObj.error) return;

        await d.interaction.send(messageObj).catch(e => d.throwError.func(d, e.message))
}
};