module.exports = {
    description: 'Returns elements that mets to the condition.',
    usage: 'name | array?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Array',
            description: 'The raw JS array.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, array = '[]') => {
        if (name == undefined) return d.throwError.required(d, 'name')

        if (!array.startsWith("[")) return d.throwError.invalid(d, "array", array);

        try {
            let parsedArray = JSON.parse(array).map(element => typeof element !== 'string' ? JSON.stringify(element) : element);
            d.data.arrays[name] = parsedArray;
        } catch (e) {
            return d.throwError.func(d, `failed to create new raw array: ${e}`);
        };
    }
}