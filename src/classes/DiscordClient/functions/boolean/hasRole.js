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
        if (roleId == undefined) return d.throwError.required(d, 'role ID')

        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        let member = guild.members.cache.get(userId)
        if (!member) return d.throwError.func(d, 'provided user is not in the guild')

        return member.roles.cache.has(roleId)
    }
};