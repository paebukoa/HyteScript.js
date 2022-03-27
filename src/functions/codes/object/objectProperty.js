module.exports = async d => {
    let [property, name = 'default'] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    let result = d.data.objects[name][property];

    if (typeof result === 'object') result = JSON.stringify(result);

    return result;
};