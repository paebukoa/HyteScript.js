module.exports = async d => {
    let [name, property = 'id'] = d.function.parameters;

    let applicationCommands = await d.client.application.commands.cache.get()

    let foundSlash = applicationCommands.find(appCmd => appCmd.name.toLowerCase() === name.toLowerCase())
    if (!foundSlash) return new d.error("invalid", d, 'application command name', name)

    let slashProperties = {
        guildid: foundSlash.guildId,
        id: foundSlash.id,
        name: foundSlash.name,
        type: foundSlash.type,
        description: foundSlash.description
    }

    return slashProperties[property.toLowerCase()]
};