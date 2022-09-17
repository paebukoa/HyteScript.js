const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a role property.',
    usage: 'property | roleId',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Role ID',
            description: 'The role which property will be get.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild that the role belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, property, roleId, guildId = d.guild?.id) => {
        if (property == undefined) return new d.error("required", d, `property`)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const role = guild.roles.cache.get(roleId)
        if (!role) return new d.error("invalid", d, 'role ID', roleId)

        return getProperty('role', role, property)
    }
}