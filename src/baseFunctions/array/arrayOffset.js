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
        if (name == undefined) return new d.error("required", d, 'name')
        if (type == undefined) return new d.error("required", d, 'type')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        const types = {
            first() {
                return d.data.arrays[name].shift();
            },
            last() {
                return d.data.arrays[name].pop();
            }
        };

        let offsetedArrayElement = types[type];
        if (!offsetedArrayElement) return new d.error("invalid", d, 'type', type);

        return offsetedArrayElement();
    }
};