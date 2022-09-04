module.exports = {
    description: 'Removes numbers from a string.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'The string to remove numbers.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error("required", d, 'string')

        return string.replace(/\d/g, '')
    }
}