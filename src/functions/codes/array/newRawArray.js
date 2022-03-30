module.exports = async d => {
    let [array = '[]', name = 'default'] = d.func.params.splits;

    if (!array.startsWith("[")) return d.throwError.invalid(d, "array", array);

    try {
        let parsedArray = JSON.parse(array);
        if (!parsedArray.every(element => typeof element === "string")) throw new TypeError(`array elements must be a string`);
        d.data.arrays[name] = parsedArray;
    } catch (e) {
        return d.throwError.func(d, `failed to create new raw array: ${e}`);
    };
}