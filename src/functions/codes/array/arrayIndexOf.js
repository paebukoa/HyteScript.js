module.exports = async d => {
    let [text, name = 'default'] = d.func.params.splits;

    if (text == undefined) return d.throwError.func(d, 'text field is required')

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    return d.data.arrays[name].indexOf(text) + 1
};