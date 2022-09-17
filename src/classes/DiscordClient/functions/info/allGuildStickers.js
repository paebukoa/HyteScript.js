module.exports = {
    description: 'Returns all stickers IDs from a guild.',
    usage: 'separator? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate stickers IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Guild ID',
            description: 'The guild to get stickers.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let stickers = (await guild.stickers.fetch()).keys()

        return [...stickers].join(separator)
    }
};