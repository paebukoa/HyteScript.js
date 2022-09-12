const { getProperty } = require("../../utils/utils");

module.exports = async d => {
    let [roleResolver, property = 'id', guildId = d.guild?.id] = d.function.parameters;
    
    let guild = d.client.guilds.cache.get(guildId)
    if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

    let role = guild.roles.cache.find(role => [role.id, role.name.toLowerCase(), role.toString()].includes(roleResolver?.toLowerCase()))
    if (!role) return;

    return getProperty('role', role, property)
};