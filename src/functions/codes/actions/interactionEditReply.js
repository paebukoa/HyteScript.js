// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [code] = d.func.params.splits;

        if (!d.interaction) return d.throwError.allow(d)

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;
        
        delete parsedMessage.reply

        await d.interaction.send(parsedMessage)
}
};