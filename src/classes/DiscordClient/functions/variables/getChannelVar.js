module.exports = {
    description: 'Returns a channel variable value.',
    usage: 'name | dbName | channelId?',
    parameters: [
        {
            name: 'name',
            description: 'The variable name',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'dbName',
            description: 'The database name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'channelID',
            description: 'The target channel ID',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    run: async (d, name, dbName, channelId = d.channel?.id) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        if (!d.client.channels.cache.has(channelId)) return new d.error("invalid", d, 'channel ID', channelId)

        return database.get(name, `_channel_${channelId}`)
    }
};