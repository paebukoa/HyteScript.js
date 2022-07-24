const { unescape } = require("../../../codings/utils");

module.exports = async (d, name, value, inline = 'false') => {
    if (d.function.parent.toLowerCase() !== 'newembed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (name == undefined) return d.throwError.required(d, 'name')
    if (value == undefined) return d.throwError.required(d, 'value')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].addField(unescape(name), unescape(value), unescape(inline) === 'true' ? true : false);
    
};