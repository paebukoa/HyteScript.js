module.exports = {
    description: 'Deletes a user variable from the given database.',
    usage: 'name | dbName | userId?',
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
            name: 'userID',
            description: 'The target user ID',
            optional: 'true',
            defaultValue: 'Author\'s ID'
        }
    ],
    run: async (d, name, dbName, userId = d.author?.id) => {
        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        if (!d.client.users.cache.has(userId)) return new d.error("invalid", d, 'user ID', userId)

        database.delete(name, `_user_${userId}`)
    }
};