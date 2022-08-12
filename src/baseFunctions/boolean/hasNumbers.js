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

        let includes = false
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        for (const number of numbers) {
            if (string.includes(number)) includes = true
        }

        return includes;
    }
}