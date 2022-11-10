const { getProperty } = require("../../utils/utils")

module.exports = {
    description: 'Returns a sticker property.',
    usage: 'property | stickerId? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from sticker.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Sticker ID',
            description: 'The sticker to get property.',
            optional: 'true',
            defaultValue: 'Current sticker ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the sticker belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, property, stickerId = d.sticker?.id, guildId = d.guild?.id) => {
        if (property == undefined) return new d.error("required", d, `property`)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const sticker = guild.stickers.cache.get(stickerId)
        if (!sticker) return new d.error("invalid", d, 'sticker ID', stickerId)

        return getProperty('sticker', sticker, property)
    }
}