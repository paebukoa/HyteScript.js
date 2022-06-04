module.exports = async d => {
    let [name = 'default', ...properties] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    let result = d.data.objects[name]

    for (const property of properties) {
        if (!Object.hasOwn(result, property)) return d.throwError.invalid(d, 'property', property);
        result = result?.[property] 
    }

    let propertiesEval = properties.map(property => `["${property.replace(`\"`, `\\"`)}"]`).join("")

    eval("delete d.data.objects[name]" + propertiesEval)
};