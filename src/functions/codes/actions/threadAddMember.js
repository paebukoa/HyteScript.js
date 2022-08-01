module.exports = {
    description: 'Adds a member to a thread.',
    usage: 'threadId | memberId? | channelId? | guildId?',
    parameters: [
        {
            name: 'Thread ID',
            description: 'The thread to add member.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Member ID',
            description: 'The member to be added.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the thread belongs to.',
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
    run: async (d, threadId, memberId = d.author?.id, channelId = d.channel?.id, guildId = d.guild?.id) => {
        if (threadId == undefined) return d.throwError.required(d, 'thread ID')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        if (!channel.threads) return d.throwError.func(d, 'provided channel doesn\'t support threads')

        const member = guild.members.cache.get(memberId)
        if (!member) return d.throwError.invalid(d, 'member ID', memberId)

        const thread = channel.threads.cache.get(threadId)
        if (!thread) return d.throwError.invalid(d, 'thread ID', threadId)

        thread.members.add(member).catch(e => d.throwError.func(d, e.message))
    }
};