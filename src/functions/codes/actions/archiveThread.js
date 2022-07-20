module.exports = {
    description: 'Archives a thread.',
    usage: 'threadId | channelId? | guildId?',
    parameters: [
        {
            name: 'Thread ID',
            description: 'The thread ID.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the thread belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID.'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID.'
        }
    ],
    run: async (d, threadId, channelId = d.channel?.id, guildId = d.guild?.id) => {
        if (threadId == undefined) return d.throwError.required(d, 'thread ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        if (!channel.threads) return d.throwError.func(d, 'provided channel doesn\'t support threads')

        const thread = channel.threads.cache.get(threadId)
        if (!thread) return d.throwError.invalid(d, 'thread ID', threadId)

        thread.setArchived(true)
    }
}