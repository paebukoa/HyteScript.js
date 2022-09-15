module.exports = {
    description: 'Pins a message.',
    usage: 'reason? | messageId? | channelId? | guildId?',
    parameters: [
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Message ID',
            description: 'The message to be pinned.',
            optional: 'true',
            defaultValue: 'Command Message ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel where the message was sent.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, reason, messageId = d.message?.id, channelId = d.channel?.id, guildId = d.guild?.id) => {
        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let message = await channel.messages.fetch(messageId)
        if (!message) return new d.error("invalid", d, 'message ID', messageId)

        await message.pin(reason).catch(e => new d.error('custom', d, e.message))
}
};