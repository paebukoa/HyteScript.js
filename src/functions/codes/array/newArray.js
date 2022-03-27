module.exports = async d => {
    let [string, sep = ',', name = 'default'] = d.func.params.splits;

    if (string == undefined) return;

    d.data.arrays[name] = string.split(sep);
};