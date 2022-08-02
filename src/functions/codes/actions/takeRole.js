module.exports = {
    description: 'Removes a role from an user.',
    usage: 'roleId | memberId? | guildId?',
    parameters: [
        {
            name: 'Role ID',
            description: 'Role to be removed.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Member ID',
            description: 'The member to have role removed.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the role belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, roleId, memberId = d.author?.id, guildId = d.guild?.id) => {
        if (roleId == undefined) return d.throwError.required(d, 'role ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)
        if (!member) return d.throwError.invalid(d, 'member ID', memberId)

        const role = guild.roles.cache.get(roleId)
        if (!role) return d.throwError.invalid(d, 'role ID', roleId)

        await member.roles.remove(role).catch(e => d.throwError.func(d, e.message))
    }
};