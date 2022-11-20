module.exports = {
    description: 'Deletes a custom variable.',
    usage: 'key | dbName',
    parameters: [
        {
            name: 'Key',
            description: 'The variable name',
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
    run: async (d, key, dbName) => {
        if (key == undefined) return new d.error("required", d, 'key')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        database.delete(key, '_custom')
    }
};