module.exports = async d => {
    let [name, dbName, memberId = d.authorId, guildId = d.guild?.id] = d.func.params.splits;

    let database = d.databases[dbName]

    if (!database) return d.throwError.invalid(d, 'database name', dbName)

    if (!database.entries[name]) return d.throwError.func(d, `entry "${name}" is not set in database "${dbName}"`)

    let guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let member = guild.members.cache.get(memberId)
    if (!member) return d.throwError.func(d, `member with ID "${memberId}" is not in provided guild.`)

    database.delete(name, `_member_${memberId}_${guildId}`)
};