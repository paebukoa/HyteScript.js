module.exports = {
    description: 'Gets an object property.',
    usage: 'name | property | property of property?...',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The object property to be returned.',
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

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name)


        let result = d.data.objects[name]

        for (const property of properties) {
            if (!Object.prototype.hasOwnProperty.call(result, property)) return d.throwError.invalid(d, 'property', property)
            result = result?.[property] 
        }

        if (typeof result !== 'string') result = JSON.stringify(result)

        return result
    }
}