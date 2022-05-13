// dontParseParams

module.exports = async d => {
    let [code] = d.func.params.splits;

    if (!d.interaction) return d.throwError.allow(d)

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
    
    let editObj = {
        content: readerData.result.unescape(),
        embeds: newEmbeds,
        components: newComponents
    }

    if (editObj.content.replaceAll('\n', '').trim() === '') delete editObj.content;

    if (JSON.stringify(editObj.embeds) === '[]' && JSON.stringify(editObj.components) === '[]' && editObj.content == undefined) return;
    
    d.interaction.editReply(editObj).catch(e => {
        return d.throwError.func(d, `failed to reply interaction: ${e}`)
    })
};