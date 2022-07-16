module.exports = async (d, name, value) => {
    if (name == undefined) return d.throwError.required(d, 'name')
    if (value == undefined) return d.throwError.required(d, 'value')

    d.data.vars.set(name, value);
};