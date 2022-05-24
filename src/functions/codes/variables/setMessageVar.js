module.exports = async d => {
    let [name, value, dbName, messageId = d.message?.id] = d.func.params.splits;

    let database = d.databases[dbName]

    if (!database) return d.throwError.invalid(d, 'database name', dbName)

    if (!database.entries[name]) return d.throwError.func(d, `entry "${name}" is not set in database "${dbName}"`)

    database.set(name, value, `_message_${messageId}`)
};