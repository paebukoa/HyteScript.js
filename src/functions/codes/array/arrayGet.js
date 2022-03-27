module.exports = async d => {
    let [index, name = "default"] = d.func.params.splits;
    
    if (isNaN(index) || Number(index) == 0) return d.throwError.invalid(d, 'element index', index);
    
    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    if (Number(index) > 0) return d.data.arrays[name].at(Number(index) - 1);
    if (Number(index) < 0) return d.data.arrays[name].at(Number(index));
}