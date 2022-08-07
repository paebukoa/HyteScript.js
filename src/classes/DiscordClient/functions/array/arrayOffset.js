module.exports = {
    description: 'Returns and removes first or last array element.',
    usage: 'name | type',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Type',
            description: '"last" or "first" element.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, type) => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (type == undefined) return d.throwError.required(d, 'type')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        const types = {
            first() {
                return d.data.arrays[name].shift();
            },
            last() {
                return d.data.arrays[name].pop();
            }
        };

        let offsetedArrayElement = types[type];
        if (!offsetedArrayElement) return d.throwError.invalid(d, 'type', type);

        return offsetedArrayElement();
    }
};