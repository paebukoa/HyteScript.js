module.exports = {
    description: 'Edits an emoji.',
    usage: 'emojiId | newName | guildId? | reason?',
    parameters: [
        {
            name: 'Emoji ID',
            description: 'The emoji to be edited.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'New name',
            description: 'The new emoji name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild to delete emoji.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run (d, emojiId, newName, guildId = d.guild?.id, reason) {
        if (emojiId == undefined) return new d.error("required", d, 'emoji ID')
        if (newName == undefined) return new d.error("required", d, 'new name')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

        const emoji = guild.emojis.cache.get(emojiId)
        if (!emoji) return new d.error('invalid', d, 'emoji ID', emojiId)

        await emoji.edit({name: newName, reason}).catch(e => new d.error('custom', d, e.message))
    }
};