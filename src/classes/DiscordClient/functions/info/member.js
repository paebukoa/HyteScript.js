const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a member property.',
    usage: 'property? | memberId? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from member.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Member ID',
            description: 'The member which property will be get.',
            optional: 'true',
            defaultValue: 'Author\'s ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild that the member belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, property = "id", memberId = d.member?.id ?? d.author?.id, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new error('invalid', d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)

        if (property === "exists") return member ? true : false;

        if (!member) return new d.error("invalid", d, "member ID", memberId);

        return getProperty('guildMember', member, property)
}}

