const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property = "id", memberId = d.member?.id ?? d.author?.id, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new error('invalid', d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)

        if (property === "exists") return member ? true : false;

        if (!member) return new d.error("invalid", d, "member ID", memberId);

        return getProperty('guildMember', member, property)
}}

