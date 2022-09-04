const { escape } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Returns a string escaped.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to escape.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, 'string')

        return escape(string);
    }
};