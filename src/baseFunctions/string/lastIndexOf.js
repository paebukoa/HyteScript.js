module.exports = {
    description: 'Returns the last index of chars in string.',
    usage: 'string | character',
    parameters: [
        {
            name: 'String',
            description: 'String to get chars index.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Character',
            description: 'The char to get last index in string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, character) => { 
        if (string == undefined) return new d.error("required", d, "string");
        if (character == undefined) return new d.error("required", d, "character");

        return string.lastIndexOf(character) + 1;
    }
};