// dontParseParams

module.exports = async d => {
    let [code, returnId = "false"] = d.func.params.splits;

    if (!['buttonInteraction', 'selectMenuInteraction'].includes(d.eventType)) return d.throwError.allow(d)

    if (returnId.includes("#")) {
        parsedReturnId = await d.reader.default(d, returnId)
        if (parsedReturnId?.error) return;
        
        returnId = parsedReturnId.result.unescape()
    }

    let embeds = JSON.stringify(d.data.embeds)
    let components = JSON.stringify(d.data.components)
    d.data.embeds = []
    d.data.components = []

    let readerData = await d.reader.default(d, code)
    if (readerData?.error) return;

    let newEmbeds = readerData.data.embeds
    let newComponents = readerData.data.components

    d.data.embeds = JSON.parse(embeds)
    d.data.components = JSON.parse(components)
    
    let updateObj = {
        content: readerData.result,
        embeds: newEmbeds,
        components: newComponents
    }

    if (updateObj.content.replaceAll('\n', '').trim() === '') delete updateObj.content;

    if (JSON.stringify(updateObj.embeds) === '[]' && JSON.stringify(updateObj.components) === '[]' && updateObj.content == undefined) return;
    
    d.interaction.update(updateObj).catch(e => {
        return d.throwError.func(d, `failed to update interaction: ${e}`)
    })
};