module.exports = async d => {
    let [name, dbName, channelId = d.channel?.id] = d.func.params.splits;

    let database = d.databases[dbName]

    if (!database) return d.throwError.invalid(d, 'database name', dbName)

    if (!database.entries[name]) return d.throwError.func(d, `entry "${name}" is not set in database "${dbName}"`)

    if (!d.client.channels.cache.has(channelId)) return d.throwError.invalid(d, 'channel ID', channelId)

    return database.get(name, `_channel_${channelId}`)
};