module.exports = {
    description: 'Returns how many characters are in provided string.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to return length.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, 'string');

        return string.length;
}};