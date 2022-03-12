module.exports = async d => {
    let [index, name = "default"] = d.params.splits;

    if (isNaN(index) || Number(index) < 1) return d.error.invalidError(d, 'index', index);
    if (!d.utils.array[name]) return d.error.invalidError(d, "array name", name);

    let arr = d.utils.array[name];
    d.result = arr[Number(index) - 1];
}