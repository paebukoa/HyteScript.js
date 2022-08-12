const { unescape } = require("../../utils/utils");

module.exports = async (d, text, iconURL) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (text == undefined) return new d.error("required", d, 'text')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setFooter({ text: unescape(text), iconURL: iconURL != undefined ? unescape(iconURL) : undefined});
};