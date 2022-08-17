module.exports = async d => {
    let [name, value, dbName, channelId = d.channel?.id] = d.function.parameters;

    let database = d.databases[dbName]

    if (!database) return new d.error("invalid", d, 'database name', dbName)

    if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

    if (!d.client.channels.cache.has(channelId)) return new d.error("invalid", d, 'channel ID', channelId)

    database.set(name, value, `_channel_${channelId}`)
};