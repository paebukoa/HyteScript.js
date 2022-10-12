module.exports = {
    description: 'Returns last index of element which matches text.',
    usage: 'name | string',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'String',
            description: 'The string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, string) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (string == undefined) return new d.error("required", d, 'text')
        
        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);
        
        return d.data.arrays[name].lastIndexOf(string) + 1
    }
};