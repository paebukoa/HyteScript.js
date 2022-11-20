const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a guild property.',
    usage: 'property? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from the given guild ID.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Guild ID',
            description: 'The guild which property will be get.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, property = "id", guildId = d.guild?.id) => {
    const guildData = d.client.guilds.cache.get(guildId);

    if (property.toLowerCase() === "exists") return guildData? true : false;

    if (!guildData) return new d.error("invalid", d, "guild ID", guildId);

    return getProperty('guild', guildData, property)
}}