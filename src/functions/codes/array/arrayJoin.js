module.exports = async d => {
    let [sep = ',', name = 'default'] = d.function.parameters;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    return d.data.arrays[name].join(sep);
};