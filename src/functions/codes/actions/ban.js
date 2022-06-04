module.exports = {
    description: 'Bans an user from a guild.',
    usage: 'userId? | guildId? | reason?',
    parameters: [
        {
            name: 'User ID',
            description: 'The user which will be banned.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the user will be banned.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'The reason that appears in Audit Log.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async d => {
    let [memberId = d.author?.id, guildId = d.guild?.id, reason] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId);
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId);
    
    const member = guild.members.cache.get(memberId);
    if (!member) return d.throwError.func(d, `the user with ID "${memberId}" is not in the guild or doesn't exists`);

    member.ban({reason}).catch(e => d.throwError.func(d, `failed to ban user: ${e}`));
}};