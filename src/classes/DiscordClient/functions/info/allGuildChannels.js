module.exports = {
    description: 'Returns all channels IDs from a guild.',
    usage: 'separator? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate channels IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Guild ID',
            description: 'The guild to get channels.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let channels = (await guild.channels.fetch()).keys()

        return [...channels].join(separator)
    }
};