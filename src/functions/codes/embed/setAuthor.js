module.exports = async (d, name, iconURL) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (name == undefined) return d.throwError.required(d, 'name')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setAuthor({ name, iconURL });
};