module.exports = {
    description: 'Creates a new context menu application command.',
    usage: 'type | name | description? | returnId?',
    parameters: [
        {
            name: 'Type',
            description: 'The context menu type.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Name',
            description: 'The name of the context menu command.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Description',
            description: 'A useless parameter, will be removed in future versions.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Return ID',
            description: 'Whether to return new application command ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async d => {
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
}};