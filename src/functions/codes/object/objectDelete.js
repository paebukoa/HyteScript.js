module.exports = async d => {
    let [property, name = 'default'] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    if (!d.data.objects[name][property]) return d.throwError.invalid(d, 'property', property);

    delete d.data.objects[name][property];
};