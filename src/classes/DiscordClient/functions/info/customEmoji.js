module.exports = async d => {
    let [emojiResolver, guildId] = d.function.parameters;

    let guild

    if (guildId) {
        guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)
    } else {
        guild = d.client
    }

    return guild.emojis.cache.get().find(emoji => emoji.name === emojiResolver || emoji.id === emojiResolver)?.toString()
};