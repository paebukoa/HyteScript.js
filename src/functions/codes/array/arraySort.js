module.exports = async d => {
    let [method, sep = ",", name = "default"] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    const methods = {
        alphabetically(arr) {return arr.sort()},
        descending(arr) {return arr.sort((a, b) => a.length - b.length)},
        ascending(arr) {return arr.sort((a, b) => b.length - a.length)}
    };

    let getResult = methods[method];
    if (!getResult) return d.throwError.invalid(d, 'method', method);

    return getResult(d.data.arrays[name]).join(sep);
};