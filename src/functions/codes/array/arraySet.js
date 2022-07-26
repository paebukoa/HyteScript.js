module.exports = {
    description: 'Sets an array element.',
    usage: 'name | index | newValue',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Index',
            description: 'The element index to be setted.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'New value',
            description: 'The value to be assigned to the index.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, index, newValue) => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (index == undefined) return d.throwError(d, 'index')
        if (newValue == undefined) return d.throwError(d, 'new value')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        if (isNaN(index) || Number(index) == 0) return d.throwError.invalid(d, 'element index', index);

        if (Number(index) > 0) d.data.arrays[name][Number(index) - 1] = newValue;
        if (Number(index) < 0) d.data.arrays[name][d.data.arrays[name].length + Number(index)] = newValue;
    }
};