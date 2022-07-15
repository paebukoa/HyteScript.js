module.exports = async (d, ms = Date.now()) => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (ms == undefined) return d.throwError.required(d, 'miliseconds')

    if (isNaN(ms)) return d.throwError.invalid(d, 'timestamp', ms);

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].setTimestamp(Number(ms));
};