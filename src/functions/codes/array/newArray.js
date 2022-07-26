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
    run: async (d, name, string, separator = ',') => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (string == undefined) return d.throwError(d, 'string')

        d.data.arrays[name] = string.split(separator);
    }
};