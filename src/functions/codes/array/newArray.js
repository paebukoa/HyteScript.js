module.exports = async d => {
    let [string, sep = ',', name = 'default'] = d.function.parameters;

    if (string == undefined) return;

    d.data.arrays[name] = string.split(sep);
};