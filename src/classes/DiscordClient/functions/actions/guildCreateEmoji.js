module.exports = {
    description: 'Creates an emoji in a guild with a URL.',
    usage: 'name | url | guildId? | returnId? | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The emoji name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The emoji image URL.',
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
            name: 'Return ID',
            description: 'Whether to return created emoji ID or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit log.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run(d, name, url, guildId = d.guild?.id, returnId = 'false', reason) {
        if (name == undefined) return new d.error("required", d, 'name')
        if (url == undefined) return new d.error("required", d, 'URL')
        
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

        let newEmoji = await guild.emojis.create({name, reason, attachment: url}).catch(e => new d.error('custom', d, e.message))

        return returnId === 'true' ? newEmoji.id : undefined
    }
};