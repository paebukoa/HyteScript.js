module.exports = {
    description: 'Removes whitespaces in the start, end or start and end of a string.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to lower case.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, type = 'both') => {
        if (string == undefined) return new d.error('required', d, 'string');

        let types = {
            both: string.trim(),
            start: string.trimStart(),
            end: string.trimEnd()
        };

        return types[type];
    }
};