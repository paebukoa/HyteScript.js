module.exports = async d => {
    let [roleId, guildId = d.guild?.id] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    const role = d.client.role.cache.get(roleId)
    if (!role) return d.throwError.invalid(d, 'role ID', roleId)

    role.delete()
};