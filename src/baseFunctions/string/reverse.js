module.exports = {
    description: 'Returns a string reversed.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'The string to reverse.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error("required", d, `text`)

        return string !== '' ? [...string].reverse().join("") : ''
    }
}