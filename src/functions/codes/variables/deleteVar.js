module.exports = async d => {
    let [name, dbName] = d.func.params.splits;

    let database = d.databases[dbName]

    if (!database) return d.throwError.invalid(d, 'database name', dbName)

    if (!database.entries[name]) return d.throwError.func(d, `entry "${name}" is not set in database "${dbName}"`)

    database.delete(name)
};