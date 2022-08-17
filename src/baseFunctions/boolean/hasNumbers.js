module.exports = {
    description: 'Returns whether a string contains numbers or not.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to be checked.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error("required", d, 'string')

        return /\d/.test(string)
    }
}