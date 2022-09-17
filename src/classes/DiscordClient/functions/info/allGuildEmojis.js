module.exports = {
    description: 'Returns all emojis IDs from a guild.',
    usage: 'separator? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate emojis IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Guild ID',
            description: 'The guild to get emojis.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let emojis = (await guild.emojis.fetch()).keys()

        return [...emojis].join(separator)
    }
};