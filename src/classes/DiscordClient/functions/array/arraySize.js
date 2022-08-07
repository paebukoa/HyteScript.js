module.exports = {
    description: 'Returns how many elements an array have.',
    usage: 'name',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name) => {
        if (name == undefined) return d.throwError.required(d, 'name')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        return d.data.arrays[name].length
    }
};