module.exports = {
    description: 'Returns all members IDs from a guild.',
    usage: 'separator? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate members IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Guild ID',
            description: 'The guild to get members.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let members = (await guild.members.fetch()).keys()

        return [...members].join(separator)
    }
};