module.exports = {
    description: 'Removes a array element and, optionally, returns it.',
    usage: 'name | index | returnRemoved?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Index',
            description: 'The element to be removed.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Return removed',
            description: 'Whether to return removed element or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, name, index, returnRemoved = 'false') => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (index == undefined) return new d.error("required", d, 'index')
        
        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        if (isNaN(index) || Number(index) < 1) return new d.error("invalid", d, 'element index', index)

        let removed = d.data.arrays[name].splice(Number(index) - 1, 1)[0]

        return returnRemoved == 'true' ?  removed : undefined
}};