module.exports = async d => {
    let [name, property, type = 'default'] = d.function.parameters;

    if (name == undefined) return new d.error("custom", d, 'name field is required')
    if (property == undefined) return new d.error("custom", d, 'property field is required')

    let command = d.commandManager[type].get(name.toLowerCase())

    return command?.[property]
};