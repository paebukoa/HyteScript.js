module.exports = {
    description: 'Reverts array elements order.',
    usage: 'name | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name) => {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name)

        return d.data.arrays[name].reverse()
    }
};