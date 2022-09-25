const { escape } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Returns a string with elements separated by separator.',
    usage: 'name | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'The characters to separate elements.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, name, separator = ',') => {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        return d.data.arrays[name].map(x => typeof x == 'string' ? escape(x) : x).join(separator);
    }
};