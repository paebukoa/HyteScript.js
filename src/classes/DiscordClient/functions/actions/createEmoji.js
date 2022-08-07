module.exports = {
    description: 'Creates a emoji in a guild.',
    usage: 'name | url | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The emoji name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The emoji URL image.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild to create emoji.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, url, guildId = d.guild?.id, reason) => {

        const guild = d.client.guilds.fetch(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        await guild.emojis.create(url, name, {reason}).catch(e => d.throwError.func(d, e.message))
    }
};