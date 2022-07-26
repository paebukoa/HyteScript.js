module.exports = {
    description: 'Appends elements to an array.',
    usage: 'name | element | element?...',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Elements',
            description: 'The elements to append.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, ...elements) => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (elements[0] == undefined) return d.throwError(d, 'element')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        d.data.arrays[name].push(...elements);
    }
};