module.exports = async (d, key, value, dbName) => {
    if (key == undefined) return new d.error("required", d, 'key')
    if (dbName == undefined) return new d.error("required", d, 'dbName')

    let database = d.databases[dbName]

    if (!database) return new d.error("invalid", d, 'database name', dbName)

    database.set(key, value, '_custom')
};