module.exports = {
    description: 'Returns the char code in text at provided index.',
    usage: 'string | index',
    parameters: [
        {
            name: 'String',
            description: 'String to get char code at index.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Index',
            description: 'The char index.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, index) => {
        if (string == undefined) return new d.error("required", d, "string")
        if (index == undefined) return new d.error("required", d, "index")

        if (isNaN(index) || Number(index) < 1) return new d.error("invalid", d, "index number", index)

        return string.charCodeAt(Number(index) - 1);
    }
};