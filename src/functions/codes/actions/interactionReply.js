// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [message, ephemeral = "false", returnId = "false"] = d.func.params.splits;

        if (!d.interaction) return d.throwError.allow(d)

        if (message == undefined) return d.throwError.func(d, `message field is required`)

        if (ephemeral.includes("#")) {
            parsedEphemeral = await d.reader.default(d, ephemeral)
            if (parsedEphemeral?.error) return;

            ephemeral = parsedEphemeral.result.unescape()
        }

        if (returnId.includes("#")) {
            parsedReturnId = await d.reader.default(d, returnId)
            if (parsedReturnId?.error) return;

            returnId = parsedReturnId.result.unescape()
        }

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;

        parsedMessage.ephemeral = ephemeral === 'true'

        let newMessage = await d.interaction.reply(parsedMessage)

        return returnId === "true" ? newMessage?.id : undefined
}
};