module.exports = async d => {
    let [roleResolver, property = 'id', guildId = d.guild?.id] = d.func.params.splits;
    
    let guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    let role = guild.roles.cache.find(role => [role.id, role.name.toLowerCase(), role.toString()].includes(roleResolver?.toLowerCase()))
    if (!role) return;

    return d.properties.role(role, property)
};