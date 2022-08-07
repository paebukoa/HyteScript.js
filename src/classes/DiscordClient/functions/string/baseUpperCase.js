module.exports = {
    description: 'Returns string with first letter in upper case and others in lower case.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'The string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return d.throwError.required(d, 'string');

        const chars = [...string];
        const firstChar = chars.shift();

        return firstChar.toUpperCase() + chars.join("").toLowerCase();
    }
}