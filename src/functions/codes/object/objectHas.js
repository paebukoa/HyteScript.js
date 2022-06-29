module.exports = {
    description: 'Checks if a object has a property.',
    usage: 'name? | property | property of property...',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [name = 'default', ...properties] = d.func.params.splits;

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        result = false
        let open = d.data.objects[name];

        for (const property of properties) {
            if (open !== undefined && Object.hasOwn(open, property)) {
                open = open[property];
                result = true
            } else {
                result = false
            }
        }

        return result;
    }
}