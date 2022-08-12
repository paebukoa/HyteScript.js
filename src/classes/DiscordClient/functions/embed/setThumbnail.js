const { unescape } = require("../../utils/utils");

module.exports = async (d, url) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (url == undefined) return new d.error("required", d, 'url')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setThumbnail(unescape(url));
};