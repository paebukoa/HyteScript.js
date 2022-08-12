module.exports = {
    description: 'Returns a role property.',
    usage: 'property | roleId',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Role ID',
            description: 'The role which property will be get.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild that the role belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async d => {
        let [property, roleId, guildId = d.guild?.id] = d.function.parameters;

        if (property == undefined) return new d.error("custom", d, `property field is required`)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const role = guild.roles.cache.get(roleId)
        if (!role) return new d.error("invalid", d, 'role ID', roleId)

        return d.properties.role(role, property)
    }
}