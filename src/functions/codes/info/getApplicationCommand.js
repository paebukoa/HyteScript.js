module.exports = async d => {
    let [name, property = 'id'] = d.func.params.splits;

    let applicationCommands = await d.client.application.commands.fetch()

    let foundSlash = applicationCommands.find(appCmd => appCmd.name.toLowerCase() === name.toLowerCase())
    if (!foundSlash) return d.throwError.invalid(d, 'application command name', name)

    let slashProperties = {
        guildid: foundSlash.guildId,
        id: foundSlash.id,
        name: foundSlash.name,
        type: foundSlash.type,
        description: foundSlash.description
    }

    return slashProperties[property.toLowerCase()]
};