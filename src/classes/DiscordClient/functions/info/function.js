module.exports = {
    description: 'Returns a function property.',
    usage: 'function | property',
    parameters: [
        {
            name: 'Function',
            description: 'The function name',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The function property to be returned.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, func, property) => {
        if (func == undefined) return d.throwError.required(d, 'func')
        if (property == undefined) return d.throwError.required(d, 'property')

        let getFunction = d.functions.get(func.toLowerCase())
        if (property.toLowerCase() === 'exists') return getFunction != undefined
        else if (getFunction == undefined) return d.throwError.invalid(d, 'function name', func)
        
        let properties = {
            name: getFunction.name,
            description: getFunction.description,
            usage: getFunction.usage,
            parameters: getFunction.parameters
        }

        let prop = properties[property.toLowerCase()]
        if (prop == undefined) return d.throwError.invalid(d, 'function property', property)

        return typeof prop === 'string' ? prop : JSON.stringify(prop)
    }
}