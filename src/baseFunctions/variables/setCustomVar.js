module.exports = {
    description: 'Sets a custom variable value.',
    usage: 'key | value | dbName',
    parameters: [
        {
            name: 'Key',
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
            description: 'The custom database name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, key, value, dbName) => {
        if (key == undefined) return new d.error("required", d, 'key')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        database.set(key, value, '_custom')
    }
};