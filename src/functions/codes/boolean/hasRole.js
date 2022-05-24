module.exports = async d => {
    let [roleId, userId = d.author?.id, guildId = d.guild?.id] = d.func.params.splits;

    if (roleId == undefined) return d.throwError.func(d, 'role ID field is required')

    let guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let member = guild.members.cache.get(userId)
    if (!member) return d.throwError.func(d, 'provided user is not in the guild')

    return member.roles.cache.has(roleId)
};