module.exports = {
    description: 'Checks if user has a permission in a guild.',
    usage: 'permission | userId? | guildId?',
    parameters: [
        {
            name: 'Permission',
            description: 'A valid permision.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'User ID',
            description: 'The user to check if has permission.',
            optional: 'true',
            defaultValue: 'Author ID.'
        },
        {
            name: 'Guild ID',
            description: 'The guild to check if user has permission.',
            optional: 'true',
            defaultValue: 'Current guild ID.'
        }
    ],
    run: async (d, permission, userId = d.author?.id, guildId = d.guild?.id) => {
        if (permission == undefined) return d.throwError.required(d, 'permission')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const member = guild.members.cache.get(userId)
        if (!member) return d.throwError.invalid(d, 'user ID', userId)

        let modifiedPermission = permission.toUpperCase().replace(' ', '_')

        const permissions = Object.keys(d.djs.Permissions.FLAGS)

        if (!permissions.includes(modifiedPermission)) return d.throwError.invalid(d, 'permission', permission)

        return member.permissions.has(modifiedPermission)
    }
}