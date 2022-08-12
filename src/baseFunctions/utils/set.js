module.exports = async (d, name, value) => {
    if (name == undefined) return new d.error("required", d, 'name')
    if (value == undefined) return new d.error("required", d, 'value')

    d.data.vars.set(name, value);
};