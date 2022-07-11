module.exports = async (d, hex) => {
    if (d.function.parent !== 'newEmbed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (hex == undefined) return d.throwError.required(d, 'hex')

    d.data.embeds[d.data.embedIndex] = d.data.embeds[d.data.embedIndex].setColor(hex);
};