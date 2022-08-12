module.exports = {
    description: 'Clears message reactions.',
    usage: 'messageId | channelId? | guildId?',
    parameters: [
        {
            name: 'Message ID',
            description: 'The message to clear reactions.',
            optional: 'false',
            defaultValue: 'Author\'s message ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the message belongs to.',
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
    run: async (d, messageId = d.message?.id, channelId = d.channel?.id, guildId = d.guild?.id) => {
        if (messageId == undefined) return new d.error("required", d, 'message ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        const message = await channel.messages.fetch(messageId)
        if (!message) return new d.error("invalid", d, 'message ID', messageId)

        await message.reactions.removeAll().catch(e => new d.error("custom", d, e.message))
    }
};