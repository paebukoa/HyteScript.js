// dontParseParams

module.exports = async d => {
    let [code, ephemeral = "false", returnId = "false"] = d.func.params.splits;

    if (!d.interaction) return d.throwError.allow(d)

    if (ephemeral.includes("#")) {
        parsedEphemeral = await d.reader.default(d, ephemeral)
        if (parsedEphemeral.error) return;

        ephemeral = parsedEphemeral.result.unescape()
    }

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        if (parsedReturnId.error) return;

        returnId = parsedReturnId.result.unescape()
    }

    let embeds = JSON.stringify(d.data.embeds)
    let components = JSON.stringify(d.data.components)
    d.data.embeds = []
    d.data.components = []

    let readerData = await d.reader.default(d, code)
    if (readerData.error) return;

    let newEmbeds = readerData.data.embeds
    let newComponents = readerData.data.components

    d.data.embeds = JSON.parse(embeds)
    d.data.components = JSON.parse(components)
    
    let replyObj = {
        content: readerData.result.unescape(),
        embeds: newEmbeds,
        components: newComponents,
        ephemeral: ephemeral === "true"
    }

    if (replyObj.content.replaceAll('\n', '').trim() === '') delete replyObj.content;

    if (JSON.stringify(replyObj.embeds) === '[]' && JSON.stringify(replyObj.components) === '[]' && replyObj.content == undefined) return;
    
    let newInteractionReply = await d.interaction.reply(replyObj).catch(e => {
        return d.throwError.func(d, `failed to reply interaction: ${e}`)
    }) 

    return returnId === "true" ? newInteractionReply?.id : undefined
};