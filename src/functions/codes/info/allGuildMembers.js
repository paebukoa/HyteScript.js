module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let members = guild.members.cache.keys()

    return [...members].join(sep)
};