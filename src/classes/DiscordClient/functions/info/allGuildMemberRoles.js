module.exports = {
    description: 'Returns all roles IDs from a member in a guild.',
    usage: 'separator? | memberId? | guildId?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate roles IDs.',
            optional: 'true',
            defaultValue: ','
        },
        {
            name: 'Member ID',
            description: 'The member to get roles.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild to get member.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, separator = ',', memberId = d.author?.id, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let member = guild.members.cache.get(memberId)
        if (!member) return new d.error("invalid", d, 'member ID', memberId)

        let roles = (await member.roles.fetch()).keys()

        return [...roles].join(separator)
    }
};