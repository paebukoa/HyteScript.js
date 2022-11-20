module.exports = {
    description: 'Sets a member variable value.',
    usage: 'name | value | dbName | guildId?',
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
            name: 'memberID',
            description: 'The target member ID',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        },
        {
            name: 'guildID',
            description: 'The target guild ID',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, name, value, dbName, memberId = d.authorId, guildId = d.guild?.id) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (dbName == undefined) return new d.error("required", d, 'dbName')

        let database = d.databases[dbName]

        if (!database) return new d.error("invalid", d, 'database name', dbName)

        if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)

        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let member = guild.members.cache.get(memberId)
        if (!member) return new d.error("custom", d, `member with ID "${memberId}" is not in provided guild.`)

        database.set(name, value, `_member_${memberId}_${guildId}`)
    }
};