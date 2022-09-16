module.exports = {
    description: 'Syncs a channel permissions with category permissions.',
    usage: 'channelId? | guildId?',
    parameters: [
        {
            name: 'Channel ID',
            description: 'The channel to sync permissions.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, channelId = d.channel?.id, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        await channel.lockPermissions().catch(e => new d.error("custom", d, e.message))
    }
};