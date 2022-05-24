module.exports = async d => {
    let [name, property, type = 'default'] = d.func.params.splits;

    if (name == undefined) return d.throwError.func(d, 'name field is required')
    if (property == undefined) return d.throwError.func(d, 'property field is required')

    let command = d.commandManager[type].get(name.toLowerCase())

    return command?.[property]
};