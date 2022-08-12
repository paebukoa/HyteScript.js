module.exports = {
    description: 'Returns whether an array includes an element or not.',
    usage: 'name | text',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Text',
            description: 'The element text.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, text) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (text == undefined) return new d.error("required", d, 'text')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        return d.data.arrays[name].includes(text) ? 'true' : 'false'
    }
};