module.exports = async d => {
    let [sep = ',', memberId = d.author?.id, guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

    let member = guild.members.cache.get(memberId)
    if (!member) return new d.error("custom", d, 'provided user is not in the guild')

    let roles = (await member.roles.fetch()).keys()

    return [...roles].join(sep)
};