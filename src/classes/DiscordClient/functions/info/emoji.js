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
    run: async (d, property, emojiId = d.emoji?.id, guildId = d.guild?.id) => {
        if (property == undefined) return new d.error("required", d, `property`)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const emoji = guild.emojis.cache.get(emojiId)
        if (!emoji) return new d.error("invalid", d, 'emoji ID', emojiId)

        return d.properties.emoji(emoji, property)
    }
}