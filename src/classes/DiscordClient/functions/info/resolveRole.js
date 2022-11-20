const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Finds a role by the given query.',
    usage: 'query | property? | guildId?',
    parameters: [
        {
            name: 'Query',
            description: 'The information to find the role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The channel property.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'guildID',
            description: 'The target guild ID.',
            optional: 'true',
            defaultValue: 'The current guild ID.'
        }
    ],
    run: async (d, roleResolver, property = 'id', guildId = d.guild?.id) => {
        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let role = guild.roles.cache.find(role => [role.id, role.name.toLowerCase(), role.toString()].includes(roleResolver?.toLowerCase()))
        if (!role) return;

        return getProperty('role', role, property)
    }
};