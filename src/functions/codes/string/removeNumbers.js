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
    run: async d => {
        let [str] = d.func.params.splits;

        if (str == undefined) return d.throwError.func(d, 'string field is required')

        return str.replace(/[0-9]/g, '')
    }
}