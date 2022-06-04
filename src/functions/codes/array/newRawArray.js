module.exports = async d => {
    let [array = '[]', name = 'default'] = d.func.params.splits;

    if (!array.startsWith("[")) return d.throwError.invalid(d, "array", array);

    try {
        let parsedArray = JSON.parse(array);
        parsedArray.map(element => typeof element !== 'string' ? JSON.stringify(element) : element)
        d.data.arrays[name] = parsedArray;
    } catch (e) {
        return d.throwError.func(d, `failed to create new raw array: ${e}`);
    };
}