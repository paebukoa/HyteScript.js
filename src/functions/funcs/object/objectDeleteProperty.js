module.exports = async d => {
    let [property, name = 'default'] = d.params.splits;

    if (!d.utils.object[name]) return d.error.invalidError(d, 'object name', name);

    delete d.utils.object[name][property];
};