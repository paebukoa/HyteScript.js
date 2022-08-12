module.exports = async (d, name, property, value) => {
    if (name == undefined) return new d.error("required", d, 'name')
    if (property == undefined) return new d.error("required", d, 'property')
    if (value == undefined) return new d.error("required", d, 'value')

    if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

    d.data.objects[name][property] = value;
};