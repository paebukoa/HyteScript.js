module.exports = async d => {
    let [property, value, name = 'default'] = d.params.splits;

    if (!d.utils.object[name]) return d.error.invalidError(d, 'object name', name);

    d.utils.object[name][property] = value;
};