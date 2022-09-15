module.exports = {
    description: 'Crossposts a message.',
    usage: 'messageId? | channelId? | guildId?',
    parameters: [
        {
            name: 'Message ID',
            description: 'The message to remove attachments.',
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
    run: async (d, messageId = d.message?.id, channelId = d.channel?.id, guildId = d.guild?.id) => {
        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let message = await channel.messages.fetch(messageId)
        if (!message) return new d.error("invalid", d, 'message ID', messageId)

        await message.crosspost().catch(e => new d.error('custom', d, e.message))
}
};