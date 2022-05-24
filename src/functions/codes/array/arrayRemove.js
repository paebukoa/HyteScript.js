module.exports = async d => {
    let [index, name = 'default'] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1) return d.throwError.invalid(d, 'element index', index)

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    d.data.arrays[name].splice(Number(index) - 1, 1)
};