module.exports = {
    description: 'Returns ban reason. Exclusive for guildBan event.',
    usage: '',
    parameters: [],
    run: async (d) => {
        if (d.eventType != 'guildBan') return new d.error('notAllowed', d, 'guildBan event.')

        return d.ban.reason
    }
};