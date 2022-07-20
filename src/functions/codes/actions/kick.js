module.exports = {
    description: 'Kicks an user from a guild.',
    usage: 'userId? | guildId? | reason?',
    parameters: [
        {
            name: 'User ID',
            description: 'The user to be kicked.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild ID which the user will be kicked.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, memberId = d.author?.id, guildId = d.guild?.id, reason) => {
        const guild = d.client.guilds.cache.get(guildId);
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId);

        const member = guild.members.cache.get(memberId);
        if (!member) return d.throwError.invalid(d, 'User ID', memberId);

        member.kick(reason).catch(e => d.throwError.func(d, `failed to kick user: ${e}`));
    }
}