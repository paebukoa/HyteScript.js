module.exports = async d => {
    let [sep = ',', guildId = d.guild?.id] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let stickers = guild.stickers.cache.keys()

    return [...stickers].join(sep)
};