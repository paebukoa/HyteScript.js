module.exports = async d => {
    let [sep = ',', memberId = d.author?.id, guildId = d.guild?.id] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let member = guild.members.cache.get(memberId)
    if (!member) return d.throwError.func(d, 'provided user is not in the guild')

    let roles = member.roles.cache.keys()

    return [...roles].join(sep)
};