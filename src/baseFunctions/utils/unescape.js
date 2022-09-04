const { unescape } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Returns a string unescaped.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to unescape.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, 'string')

        return unescape(string);
    }
};