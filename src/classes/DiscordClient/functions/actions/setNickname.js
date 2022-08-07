module.exports = {
    description: 'Sets an user nickname in a guild.',
    usage: 'nickname | memberId? | guildId?',
    parameters: [
        {
            name: 'Nickname',
            description: 'The nickname to be setted (leave empty if you want to reset nickname).',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Member ID',
            description: 'The member to set nickname.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild to set member nickname.',
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
    run: async (d, nickname, memberId = d.author?.id, guildId = d.guild?.id, reason) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)
        if (!member) return d.throwError.invalid(d, 'member ID', memberId)

        await member.setNickname(nickname != undefined ? nickname : null, reason).catch(e => d.throwError.func(d, e.message))
    }
};