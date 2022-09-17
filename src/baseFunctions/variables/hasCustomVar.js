module.exports = {
    run: async (d, key, dbName) => {
        if (key == undefined) return new d.error("required", d, 'key')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        return database.has(key, '_custom')
    }
};