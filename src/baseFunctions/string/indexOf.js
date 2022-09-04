module.exports = {
    description: 'Returns the index of chars in string.',
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
            description: 'The char to get index in string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, character) => { 
        if (string == undefined) return new d.error("required", d, "string");
        if (character == undefined) return new d.error("required", d, "character");

        return string.indexOf(character) + 1;
    }
};