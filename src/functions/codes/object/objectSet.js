module.exports = async d => {
    let [property, value, name = 'default'] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    d.data.objects[name][property] = value;
};