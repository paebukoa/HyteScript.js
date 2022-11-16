module.exports = {
    description: 'Unbans a banned user.',
    usage: 'userId? | guildId? | reason?',
    parameters: [
        {
            name: 'User ID',
            description: 'The user to be unbanned.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild to unban user.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, userId = d.author?.id, guildId = d.guild?.id, reason) => {
        const guild = d.client.guilds.cache.get(guildId);
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId);

        await guild.bans.remove(userId, reason).catch(e => new d.error('custom', d, e.message))
    }
};