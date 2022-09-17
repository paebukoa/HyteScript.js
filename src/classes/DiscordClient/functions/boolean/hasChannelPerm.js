const { PermissionsBitField } = require('discord.js')

module.exports = {
    description: 'Checks if user has a permission in a guild channel.',
    usage: 'permission | userId? | channelId? | guildId?',
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
            name: 'Channel ID',
            description: 'The channel to check if user has permission.',
            optional: 'true',
            defaultValue: 'Current channel ID.'
        },
        {
            name: 'Guild ID',
            description: 'The guild of the channel.',
            optional: 'true',
            defaultValue: 'Current guild ID.'
        }
    ],
    run: async (d, permission, userId = d.author?.id, channelId = d.channel?.id, guildId = d.guild?.id) => {
        if (permission == undefined) return new d.error("required", d, 'permission')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        const member = guild.members.cache.get(userId)
        if (!member) return new d.error("invalid", d, 'user ID', userId)

        const memberChannelPermissions = member.permissionsIn(channel).toArray()

        if (!(permission in PermissionsBitField.Flags)) return new d.error("invalid", d, 'permission', permission)
        
        return memberChannelPermissions.has(permission)
    }
}