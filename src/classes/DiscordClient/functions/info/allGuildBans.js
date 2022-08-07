module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let bans = (await guild.bans.fetch()).keys()

    return [...bans].join(sep)
};