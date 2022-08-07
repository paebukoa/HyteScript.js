module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let roles = (await guild.roles.fetch()).keys()

    return [...roles].join(sep)
};