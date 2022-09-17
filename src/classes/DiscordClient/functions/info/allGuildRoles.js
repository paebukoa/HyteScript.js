module.exports = {
    description: 'Returns all roles IDs from a guild.',
    usage: 'separator? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate roles IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Guild ID',
            description: 'The guild to get roles.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let roles = (await guild.roles.fetch()).keys()

        return [...roles].join(separator)
    }
};