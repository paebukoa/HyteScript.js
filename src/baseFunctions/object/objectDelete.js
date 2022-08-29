module.exports = {
    description: 'Deletes an object property.',
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
            description: 'The object property to be deleted.',
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
    if (name == undefined) return new d.error("required", d, 'name')
    if (properties[0] == undefined) return new d.error("required", d, 'property')

    if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

    let result = d.data.objects[name]

    for (const property of properties) {
        if (!Object.hasOwn(result, property)) return new d.error("invalid", d, 'property', property);
        result = result?.[property] 
    }

    let propertiesEval = properties.map(property => `["${property.replace(`\"`, `\\"`)}"]`).join("")

    eval("delete d.data.objects[name]" + propertiesEval)
}};