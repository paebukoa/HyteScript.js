module.exports = {
    run: async (d, name, dbName, userId = d.author?.id) => {
        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        if (!d.client.users.cache.has(userId)) return new d.error("invalid", d, 'user ID', userId)

        database.delete(name, `_user_${userId}`)
    }
};