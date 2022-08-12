const { unescape } = require("../../utils/utils");

module.exports = async (d, hex) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (hex == undefined) return new d.error("required", d, 'hex')

    d.data.message.embeds[d.data.embedIndex].setColor(unescape(hex));
};