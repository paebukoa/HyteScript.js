// dontParseParams

module.exports = async d => {
    let [code, returnId = "false"] = d.func.params.splits;

    if (!d.interaction) return d.throwError.func(d, `triggered event is not an interaction`)
    if (d.interaction.isCommand()) return d.throwError.func(d, `can't update a slash command interaction`)

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        returnId = parsedReturnId.result
    }

    let embeds = JSON.stringify(d.data.embeds)
    let readerData = await d.reader.default((d), code)
    let newEmbeds = JSON.stringify(readerData.data.embeds)
    d.data.embeds = JSON.parse(embeds)
    
    let updateObj = {
        content: readerData.result,
        embeds: JSON.parse(newEmbeds),
        ephemeral: ephemeral === "true"
    }

    if (readerData.result.replaceAll('\n', '').trim() === '') delete updateObj.content
    
    if (newEmbeds === "[]" && readerData.result.replaceAll('\n', '').trim() === '') return
    
    let newInteractionUpdate = await d.interaction.update(updateObj).catch(e => {
        return d.throwError.func(d, `failed to update interaction: ${e}`)
    })

    return returnId === "true" ? newInteractionUpdate?.id : undefined
};