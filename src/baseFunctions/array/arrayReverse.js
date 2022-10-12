module.exports = {
    description: 'Reverts array elements order.',
    usage: 'name | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        }, {
            name: 'Separator',
            description: 'Characters that will separate elements.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, name, separator = ',') => {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name)

        return d.data.arrays[name].slice(0).reverse().join(separator)
    }
};