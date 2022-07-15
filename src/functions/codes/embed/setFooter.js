module.exports = async (d, text, iconURL) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (text == undefined) return d.throwError.required(d, 'text')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setFooter({ text, iconURL });
};