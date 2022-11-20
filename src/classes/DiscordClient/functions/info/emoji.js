const { getProperty } = require("../../utils/utils")

module.exports = {
    description: 'Returns a emoji property.',
    usage: 'property | emojiId? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Emoji ID',
            description: 'The emoji which property will be get.',
            optional: 'true',
            defaultValue: 'Current emoji ID'
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

        return getProperty('emoji', emoji, property)
    }
}