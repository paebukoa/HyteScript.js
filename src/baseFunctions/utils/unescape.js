const { unescape } = require("../../utils/BaseUtils");

module.exports = async (d, string) => {
    if (string == undefined) return new d.error('required', d, 'string')

    return unescape(string);
};