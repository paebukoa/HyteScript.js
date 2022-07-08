module.exports = async d => {
    let [name = 'default'] = d.function.parameters;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    return d.data.arrays[name].length
};