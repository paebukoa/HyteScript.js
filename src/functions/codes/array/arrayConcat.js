module.exports = async d => {
    let [name = 'default', ...elements] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    if (elements.length == 0) return d.throwError.func(d, 'elements fields are required')

    return d.data.arrays[name].concat(elements)
};