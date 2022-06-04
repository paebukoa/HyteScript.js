module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [threadId, channelId = d.channel?.id, guildId = d.guild?.id] = d.func.params.splits;

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        if (!channel.threads) return d.throwError.func(d, 'provided channel doesn\'t support threads')

        const thread = channel.threads.cache.get(threadId)
        if (!thread) return d.throwError.invalid(d, 'thread ID', threadId)

        thread.setArchived(false)
    }
}