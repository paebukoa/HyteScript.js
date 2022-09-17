module.exports = {
    description: 'Returns a loaded command property.',
    usage: 'name | property | type?',
    parameters: [
        {
            name: 'Name',
            description: 'The command name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to get from command.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Type',
            description: 'The command type.',
            optional: 'true',
            defaultValue: 'default'
        }
    ],
    run: async (d, name, property, type = 'default') => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (property == undefined) return new d.error("required", d, 'property')

        let command = d.commandManager[type].get(name.toLowerCase())

        return command?.[property]
    }
};