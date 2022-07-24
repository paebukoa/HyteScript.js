const { unescape } = require("../../../codings/utils");

module.exports = async (d, url) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (url == undefined) return d.throwError.required(d, 'url')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setImage(unescape(url));
};