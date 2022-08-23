module.exports = {
    description: 'Deletes an emoji.',
    usage: 'emojiId | guildId? | reason?',
    parameters: [
        {
            name: 'Emoji ID',
            description: 'The emoji to be deleted.',
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
    run: async (d, emojiId, guildId = d.guild?.id, reason) => {
        if (emojiId == undefined) return new d.error("required", d, 'emoji ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

        const emoji = guild.emojis.cache.get(emojiId)
        if (!emoji) return new d.error('invalid', d, 'emoji ID', emojiId)

        await emoji.delete(reason).catch(e => new d.error('custom', d, e.message))
    }
};