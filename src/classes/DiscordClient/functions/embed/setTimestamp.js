const { unescape } = require("../../utils/utils");

module.exports = async (d, ms = Date.now()) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (ms == undefined) return new d.error("required", d, 'miliseconds')

    if (isNaN(ms)) return new d.error("invalid", d, 'timestamp', ms);

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setTimestamp(Number(unescape(typeof ms == 'number' ? ms.toString() : ms)));
};