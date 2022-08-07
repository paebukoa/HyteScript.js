module.exports = async (d, name, property, value) => {
    if (name == undefined) return d.throwError.required(d, 'name')
    if (property == undefined) return d.throwError.required(d, 'property')
    if (value == undefined) return d.throwError.required(d, 'value')

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    d.data.objects[name][property] = value;
};