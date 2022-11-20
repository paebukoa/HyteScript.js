module.exports = {
    description: 'Sets a guild variable value.',
    usage: 'name | value | dbName | guildId?',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Value',
            description: 'The variable value.',
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
            name: 'guildID',
            description: 'The target guild ID',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, name, value, dbName, guildId = d.guild?.id) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        if (!d.client.guilds.cache.has(guildId)) return new d.error("invalid", d, 'guild ID', guildId)

        database.set(name, value, `_guild_${guildId}`)
    }
};