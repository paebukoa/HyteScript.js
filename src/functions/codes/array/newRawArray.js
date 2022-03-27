module.exports = async d => {
    let [array = '[]', name = 'default'] = d.func.params.splits;

    if (!array.startsWith("[")) return d.throwError.invalid(d, "array", array);

    try {
        d.data.arrays[name] = JSON.parse(array);
    } catch (e) {
        return d.throwError.func(d, `failed to create new raw array: ${e}`);
    };
}