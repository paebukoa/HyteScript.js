module.exports = async d => {
    let [string, name = 'default'] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    if (string == undefined) return;

    d.data.arrays[name].push(string);
};