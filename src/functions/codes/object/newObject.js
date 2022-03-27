module.exports = async d => {
    let [object = '{}', name = 'default'] = d.func.params.splits;

    if (!object.startsWith("{")) return d.throwError.invalid(d, "JSON object", object);

    try {
        d.data.objects[name] = JSON.parse(object);
    } catch (e) {
        return d.throwError.func(d, `failed to create new object: ${e}`);
    };
}