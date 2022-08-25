const { escape } = require("../../utils/BaseUtils");

module.exports = async (d, string) => {
    if (string == undefined) return new d.error('required', d, 'string')

    return escape(string);
};