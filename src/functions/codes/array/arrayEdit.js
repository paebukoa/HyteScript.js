module.exports = async d => {
    let [index, newValue, name = "default"] = d.func.params.splits;

    if (isNaN(index) || Number(index) == 0) return d.throwError.invalid(d, 'element index', index);
    
    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    console.log(`${d.data.arrays[name].length} => ${d.data.arrays[name].length + Number(index)}`);

    if (Number(index) > 0) d.data.arrays[name][Number(index) - 1] = newValue;
    if (Number(index) < 0) d.data.arrays[name][d.data.arrays[name].length + Number(index)] = newValue;
};