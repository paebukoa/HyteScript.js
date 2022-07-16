module.exports = {
    description: 'Checks if a object has a property.',
    usage: 'name? | property | property of property...',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The object property to be checked.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Propeties of properties',
            description: 'Property of previous property, if previous property is an object.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, ...properties) => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (properties[0] == undefined) return d.throwError.required(d, 'property')

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        result = false
        let open = d.data.objects[name];

        for (const property of properties) {
            if (open !== undefined && Object.prototype.hasOwnProperty.call(open, property)) {
                open = open[property];
                result = true
            } else {
                result = false
            }
        }

        return result;
    }
}