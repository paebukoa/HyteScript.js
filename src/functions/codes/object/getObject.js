module.exports = async (d, name, format = 'false') => {
    if (name == undefined) return d.throwError.required(d, 'name')

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    return JSON.stringify(d.data.objects[name], null, format === "true" ? 2 : 0);
};