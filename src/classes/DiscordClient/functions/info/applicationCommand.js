module.exports = {
    description: 'Returns an application command property.',
    usage: 'name | property?',
    parameters: [
        {
            name: 'Name',
            description: 'The application command name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The application command property to be returned.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    run: async (d, name, property = 'id') => {
        if (name == undefined) return new d.error('required', d, 'name')

        let applicationCommands = await d.client.application.commands.fetch()

        let foundSlash = applicationCommands.find(appCmd => appCmd.name.toLowerCase() === name.toLowerCase())
        if (!foundSlash) return new d.error("invalid", d, 'name', name)

        let slashProperties = {
            guildid: foundSlash.guildId,
            id: foundSlash.id,
            name: foundSlash.name,
            type: foundSlash.type,
            description: foundSlash.description
        }

        return slashProperties[property.toLowerCase()]
    }
};