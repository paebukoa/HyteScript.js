module.exports = async d => {
    let [emojiResolver, guildId] = d.func.params.splits;

    let guild

    if (guildId) {
        guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)
    } else {
        guild = d.client
    }

    return guild.emojis.cache.find(emoji => emoji.name === emojiResolver || emoji.id === emojiResolver)?.toString()
};