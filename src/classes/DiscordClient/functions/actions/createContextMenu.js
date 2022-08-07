module.exports = {
    description: 'Creates a new context menu application command.',
    usage: 'type | name | returnId?',
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
            name: 'Return ID',
            description: 'Whether to return new application command ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, type, name, returnId = 'false') => {
        if (type == undefined) return d.throwError.required(d, 'type')
        if (name == undefined) return d.throwError.required(d, 'name')

        if (!['USER', 'MESSAGE'].includes(type.toUpperCase())) return d.throwError.invalid(d, 'type', type)

        let newContextMenu = await d.client.application.commands.create({
            name,
            type: type.toUpperCase()
        }).catch(e => d.throwError.func(d, e.message))

        return returnId === 'true' ? newContextMenu?.id : undefined
    }
};