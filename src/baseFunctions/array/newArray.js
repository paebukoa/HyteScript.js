const { unescape } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Creates a new array.',
    usage: 'name | string | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'String',
            description: 'The string to be separated.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'The characters to separate string.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    dontUnescape: [1],
    run: async (d, name, string, separator = ',') => {
        if (name == undefined) return new d.error("required", d, 'name')

        d.data.arrays[name] = string == undefined ? [] : string.split(separator).map(x => unescape(x));
    }
};