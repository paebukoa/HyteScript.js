module.exports = {
    description: 'Sorts array by provided method.',
    usage: 'name | method | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Method',
            description: 'The sort method: alphabetically, descending or ascending.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'Characters which will separate sorted elements.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, name, method, separator = ",") => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (method == undefined) return d.throwError.required(d, 'method')

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        const methods = {
            alphabetically(arr) {return arr.sort()},
            descending(arr) {return arr.sort((a, b) => a.length - b.length)},
            ascending(arr) {return arr.sort((a, b) => b.length - a.length)}
        };

        let getResult = methods[method];
        if (!getResult) return d.throwError.invalid(d, 'method', method);

        return getResult(d.data.arrays[name]).join(separator);
    }
};