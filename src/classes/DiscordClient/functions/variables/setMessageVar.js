module.exports = {
    description: 'Sets a message variable value.',
    usage: 'name | value | dbName | messageId?',
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
            name: 'messageID',
            description: 'The target message ID',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        }
    ],
    run: async (d, name, value, dbName, messageId = d.message?.id) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        database.set(name, value, `_message_${messageId}`)
    }
};