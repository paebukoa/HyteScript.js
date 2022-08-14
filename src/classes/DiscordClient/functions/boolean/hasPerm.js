const { PermissionsBitField } = require('discord.js')

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
        if (permission == undefined) return new d.error("required", d, 'permission')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const member = guild.members.cache.get(userId)
        if (!member) return new d.error("invalid", d, 'user ID', userId)

        if (PermissionsBitField.Flags[permission] == undefined) return new d.error("invalid", d, 'permission', permission)

        return member.permissions.has(permission)
    }
}