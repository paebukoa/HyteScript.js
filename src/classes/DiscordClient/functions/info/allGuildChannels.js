module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

    let channels = (await guild.channels.fetch()).keys()

    return [...channels].join(sep)
};