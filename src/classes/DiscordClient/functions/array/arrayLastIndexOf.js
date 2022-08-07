module.exports = {
    description: 'Returns last index of element which matches text.',
    usage: 'name | condition | separator?',
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
        if (name == undefined) return d.throwError.required(d, 'name')
        if (text == undefined) return d.throwError.required(d, 'text')

        if (text == undefined) return d.throwError.func(d, 'text field is required')
        
        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);
        
        return d.data.arrays[name].lastIndexOf(text) + 1
    }
};