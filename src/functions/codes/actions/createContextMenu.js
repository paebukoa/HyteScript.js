module.exports = async d => {
    let [type, name, description, returnId = 'false'] = d.func.params.splits;

    let types = ['USER', 'MESSAGE']

    if (!types.includes(type.toUpperCase())) return d.throwError.invalid(d, 'type', type)

    if (!name) return d.throwError.func(d, 'name field is required')

    let newContextMenu = await d.client.application.commands.create({
        name,
        type: type.toUpperCase()
    }).catch(e => {
        return d.throwError.func(d, `failed to create command: ${e}`)
    })

    return returnId === 'true' ? newContextMenu?.id : undefined
};