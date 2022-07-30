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
        if (name == undefined) return d.throwError.required(d, 'name')
        if (index == undefined) return d.throwError.required(d, 'index')

        if (isNaN(index) || Number(index) < 1) return d.throwError.invalid(d, 'element index', index)

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        return returnRemoved == 'true' ? d.data.arrays[name].splice(Number(index) - 1, 1) : undefined
}};