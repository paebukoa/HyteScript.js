module.exports = async d => {
    let [index, name = "default"] = d.params.splits;

    if (isNaN(index) || Number(index) < 1) return d.error.functionError(d, `The index "${index}" is invalid!`);
    if (!d.utils.array[name]) return d.error.functionError(d, `Array with name "${name}" not found!`);

    let arr = d.utils.array[name];
    d.result = arr[Number(index) - 1];
}