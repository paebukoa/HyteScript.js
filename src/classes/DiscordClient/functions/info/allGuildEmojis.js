module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

    let emojis = (await guild.emojis.fetch()).keys()

    return [...emojis].join(sep)
};