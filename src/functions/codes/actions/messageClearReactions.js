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
        if (messageId == undefined) return d.throwError.required(d, 'message ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        const message = channel.messages.cache.get(messageId)
        if (!message) return d.throwError.invalid(d, 'message ID', messageId)

        message.reactions.removeAll().catch(e => d.throwError.func(d, e.message))
    }
};