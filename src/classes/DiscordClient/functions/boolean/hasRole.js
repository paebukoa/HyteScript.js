module.exports = {
    description: 'Returns whether an user has a role or not.',
    usage: 'roleId | userId? | guildId?',
    parameters: [
        {
            name: 'Role ID',
            description: 'The role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'User ID',
            description: 'User to check if has role.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'Guild which the role belongs to.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, roleId, userId = d.author?.id, guildId = d.guild?.id) => {
        if (roleId == undefined) return new d.error("required", d, 'role ID')

        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let member = guild.members.cache.get(userId)
        if (!member) return new d.error("invalid", d, 'user ID', userId)

        let role = guild.roles.cache.get(roleId)
        if (!role) return new d.error('invalid', d, 'role ID', roleId)

        return member.roles.cache.has(role)
    }
};