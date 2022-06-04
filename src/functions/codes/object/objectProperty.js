module.exports = async d => {
    let [name = 'default', ...properties] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    let result = d.data.objects[name]

    for (const property of properties) {
        if (!Object.hasOwn(result, property)) return d.throwError.invalid(d, 'property', property);
        result = result?.[property] 
    }

    if (typeof result !== 'string') result = JSON.stringify(result);

    return result;
};