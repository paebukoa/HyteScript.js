module.exports = {
    description: 'Unmutes a guild member.',
    usage: 'memberId? | guildId? | reason?',
    parameters: [
        {
            name: 'Member ID',
            description: 'The guild member to be unmuted.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild to unmute user.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run(d, memberId = d.author?.id, guildId = d.guild?.id, reason) {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)
        if (!member) return new d.error('invalid', d, 'member ID', memberId)

        await member.voice.setMute(false, reason).catch(e => new d.error('custom', d, e.message))
    }
};