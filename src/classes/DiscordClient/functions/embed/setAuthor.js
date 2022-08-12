const { unescape } = require("../../utils/utils");

module.exports = async (d, name, iconURL) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (name == undefined) return new d.error("required", d, 'name')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setAuthor({ name: unescape(name), iconURL: iconURL != undefined ? unescape(iconURL) : undefined });
};