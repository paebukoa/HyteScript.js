module.exports = async d => {
    let [name, value, dbName, guildId = d.guild?.id] = d.func.params.splits;

    let database = d.databases[dbName]

    if (!database) return d.throwError.invalid(d, 'database name', dbName)

    if (!database.entries[name]) return d.throwError.func(d, `entry "${name}" is not set in database "${dbName}"`)

    if (!d.client.guilds.cache.has(guildId)) return d.throwError.invalid(d, 'guild ID', guildId)

    database.set(name, value, `_guild_${guildId}`)
};