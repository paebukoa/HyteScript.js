module.exports = async (d, name, ...properties) => {
    if (name == undefined) return new d.error("required", d, 'name')
    if (property[0] == undefined) return new d.error("required", d, 'property')

    if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

    let result = d.data.objects[name]

    for (const property of properties) {
        if (!Object.hasOwn(result, property)) return new d.error("invalid", d, 'property', property);
        result = result?.[property] 
    }

    let propertiesEval = properties.map(property => `["${property.replace(`\"`, `\\"`)}"]`).join("")

    eval("delete d.data.objects[name]" + propertiesEval)
};