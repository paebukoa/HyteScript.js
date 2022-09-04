module.exports = {
    description: 'Returns string with all chars in upper case.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to upper case.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, 'string')

        return string.toUpperCase();
    }
};