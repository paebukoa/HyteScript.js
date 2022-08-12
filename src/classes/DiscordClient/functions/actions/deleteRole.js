module.exports = {
    description: 'Deletes a role by ID.',
    usage: 'roleId | guildId?',
    parameters: [
        {
            name: 'Role ID',
            description: 'The role to be deleted.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the role belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID.'
        }
    ],
    run: async (d, roleId, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const role = d.client.role.cache.get(roleId)
        if (!role) return new d.error("invalid", d, 'role ID', roleId)

        await role.delete().catch(e => new d.error("custom", d, e.message))
    }
}