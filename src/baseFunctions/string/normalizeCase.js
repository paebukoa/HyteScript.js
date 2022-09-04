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
        if (string == undefined) return new d.error("required", d, 'string');

        const chars = [...string];
        let firstChar = chars.shift();
        if (firstChar == undefined) firstChar = ''

        return firstChar.toUpperCase() + chars.join("").toLowerCase();
    }
}