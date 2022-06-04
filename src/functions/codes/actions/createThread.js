// dontParseParams

module.exports = {
    description: 'Creates a thread in a channel.',
    usage: 'name? | messageId? | type? | invitable?',
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
        let [name, messageId, type = 'public', autoArchiveDuration = '60', invitable = 'false', channelId = d.channel?.id, guildId = d.guild?.id, returnId = 'false'] = d.func.params.splits;

        const threadTypes = {
            public: 'GUILD_PUBLIC_THREAD',
            private: 'GUILD_PRIVATE_THREAD'
        }

        let threadType = threadTypes[type.toLowerCase()]

        if (!threadType) return d.throwError.invalid(d, 'thread type', type)

        const archiveDurationTypes = {
            60: 60,
            1440: 1440,
            4320: 4320,
            10080: 10080,
            max: 'MAX'
        }

        let archiveDurationType = archiveDurationTypes[autoArchiveDuration.toLowerCase()]

        if (!archiveDurationType) return d.throwError.invalid(d, 'auto archive duration', autoArchiveDuration)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        if (!channel.threads) return d.thowError.func(d, 'the provided channel doesn\'t support threads')

        let newThread = await channel.threads.create({
            name,
            type: threadType,
            message: messageId,
            invitable: invitable === 'true',
            autoArchiveDuration: archiveDurationType
        })

        return returnId === "true" ? newThread?.id : undefined
    }
}