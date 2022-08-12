module.exports = async d => {
    let [name, dbName, messageId = d.message?.id] = d.function.parameters;

    let database = d.databases[dbName]

    if (!database) return new d.error("invalid", d, 'database name', dbName)

    if (!database.entries[name]) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

    return database.get(name, `_message_${messageId}`)
};