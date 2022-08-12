const { unescape } = require("../../utils/utils");

module.exports = async (d, name, value, inline = 'false') => {
    if (d.function.parent.toLowerCase() !== 'newembed') return new d.error("notAllowed", d, `#(newEmbed)`)

    if (name == undefined) return new d.error("required", d, 'name')
    if (value == undefined) return new d.error("required", d, 'value')

    d.data.message.embeds[d.data.embedIndex] = d.data.message.embeds[d.data.embedIndex].addField(unescape(name), unescape(value), unescape(inline) === 'true' ? true : false);
    
};