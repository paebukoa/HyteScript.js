// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [code] = d.function.parameters;

        if (!['interaction', 'buttonInteraction', 'selectMenuInteraction'].includes(d.eventType)) return d.throwError.allow(d)

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;

        delete parsedMessage.reply

        await d.interaction.update(parsedMessage)
}
};