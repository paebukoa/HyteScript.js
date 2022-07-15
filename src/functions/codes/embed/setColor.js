module.exports = async (d, hex) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (hex == undefined) return d.throwError.required(d, 'hex')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setColor(hex.toUpperCase());
};