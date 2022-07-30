module.exports = {
    description: 'Checks if a string a number.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'The string to be checked.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
    if (string == undefined) return d.throwError.required(d, 'number')

    return !isNaN(string);
}};