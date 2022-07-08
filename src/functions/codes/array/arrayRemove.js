module.exports = async d => {
    let [index, name = 'default'] = d.function.parameters;

    if (isNaN(index) || Number(index) < 1) return d.throwError.invalid(d, 'element index', index)

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    d.data.arrays[name].splice(Number(index) - 1, 1)
};