module.exports = {
    description: 'Returns a custom emoji.',
    usage: 'emojiName | guildId?',
    parameters: [
        {
            name: 'Emoji name',
            description: 'The emoji to be returned.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild to find emoji.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, emojiResolvable, guildId) => {
        if (emojiResolvable == undefined) return new d.error('required', d, 'emoji name')

        let guild;

        if (guildId != undefined) {
            guild = d.client.guilds.cache.get(guildId)
            if (!guild) return new d.error("invalid", d, 'guild ID', guildId)
        } else {
            guild = d.client
        }

        return guild.emojis.cache.get().find(emoji => emoji.name === emojiResolvable || emoji.id === emojiResolvable)?.toString?.()
}};