module.exports = async d => {
    let [name, ...properties] = d.func.params.splits;

    if (name.trim() === "") name = "default"

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    let result = d.data.objects[name]

    for (const property of properties) {
        if (result == undefined) return d.throwError.func(d, `can't read property "${property}" of undefined`)

        if (!Object.hasOwn(result, property)) return result = undefined;
        result = result[property] 
    }

    if (typeof result !== 'string') result = JSON.stringify(result);

    return result;
};