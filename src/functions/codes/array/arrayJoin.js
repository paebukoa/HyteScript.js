const { escape } = require("../../../codings/utils");

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
        if (name == undefined) return d.throwError.required(d, 'name')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        return d.data.arrays[name].map(x => escape(x)).join(separator);
    }
};