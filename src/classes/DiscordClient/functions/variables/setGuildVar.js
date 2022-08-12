module.exports = async d => {
    let [name, value, dbName, guildId = d.guild?.id] = d.function.parameters;

    let database = d.databases[dbName]

    if (!database) return new d.error("invalid", d, 'database name', dbName)

    if (!database.entries[name]) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

    if (!d.client.guilds.cache.has(guildId)) return new d.error("invalid", d, 'guild ID', guildId)

    database.set(name, value, `_guild_${guildId}`)
};