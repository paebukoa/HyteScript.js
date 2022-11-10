module.exports = {
    description: 'Creates a sticker in a guild.',
    usage: 'name | description? | url | emoji | guildId? | returnId? | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The sticker name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Description',
            description: 'The sticker description.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The sticker image URL.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'emoji',
            description: 'The emoji representing the sticker\'s expression.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the sticker will be created.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return created sticker ID or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run(d, name, description, url, emoji, guildId = d.guild?.id, returnId = 'false', reason) {
        if (name == undefined) return new d.error('required', d, 'name')
        if (url == undefined) return new d.error('required', d, 'URL')
        if (emoji == undefined) return new d.error('required', d, 'emoji')

        let obj = {
            name,
            file: url,
            tags: emoji,
            description,
            reason
        }

        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID')

        let sticker = await guild.stickers.create(obj).catch(e => new d.error('custom', d, e))

        return returnId == 'true' ? sticker?.id : undefined;
        
    }
}