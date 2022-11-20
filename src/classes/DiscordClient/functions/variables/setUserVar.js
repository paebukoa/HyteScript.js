module.exports = {
    description: 'Sets a user variable value.',
    usage: 'name | value | dbName | userId?',
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
            name: 'userID',
            description: 'The target user ID',
            optional: 'true',
            defaultValue: 'Author\'s ID'
        }
    ],
    run: async (d, name, value, dbName, userId = d.author?.id) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        if (!d.client.users.cache.has(userId)) return new d.error("invalid", d, 'user ID', userId)

        database.set(name, value, `_user_${userId}`)
    }
};