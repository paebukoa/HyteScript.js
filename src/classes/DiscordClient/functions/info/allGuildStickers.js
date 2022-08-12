module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.function.parameters;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

    let stickers = (await guild.stickers.fetch()).keys()

    return [...stickers].join(sep)
};