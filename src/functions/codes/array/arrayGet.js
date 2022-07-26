module.exports = {
    description: 'Gets an array element by index.',
    usage: 'name | index',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Index',
            description: 'The element index.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, index) => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (index == undefined) return d.throwError.required(d, 'index')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);
        if (isNaN(index) || Number(index) == 0) return d.throwError.invalid(d, 'element index', index);

        if (Number(index) > 0) return d.data.arrays[name].at(Number(index) - 1);
        if (Number(index) < 0) return d.data.arrays[name].at(Number(index));
    }
}