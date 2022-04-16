// dontParseParams

module.exports = async d => {
    let [code, ephemeral = "false", returnId = "false"] = d.func.params.splits;

    if (!d.interaction) return d.throwError.allow(d)

    if (ephemeral.includes("#")) {
        parsedEphemeral = await d.reader.default(d, ephemeral)
        if (parsedEphemeral.error) return;

        returnId = parsedEphemeral.result
    }

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        if (parsedReturnId.error) return;
        returnId = parsedReturnId.result
    }

    let embeds = JSON.stringify(d.data.embeds)
    let readerData = await d.reader.default((d), code)
    if (readerData.error) return;

    let newEmbeds = JSON.stringify(readerData.data.embeds)
    d.data.embeds = JSON.parse(embeds)
    
    let replyObj = {
        content: readerData.result,
        embeds: JSON.parse(newEmbeds),
        ephemeral: ephemeral === "true"
    }

    if (readerData.result.replaceAll('\n', '').trim() === '') delete replyObj.content
    
    if (newEmbeds === "[]" && readerData.result.replaceAll('\n', '').trim() === '') return
    
    let newInteractionReply = await d.interaction.reply(replyObj).catch(e => {
        return d.throwError.func(d, `failed to reply interaction: ${e}`)
    })

    return returnId === "true" ? newInteractionReply?.id : undefined
};