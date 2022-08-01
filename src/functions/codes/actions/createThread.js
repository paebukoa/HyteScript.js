module.exports = {
    description: 'Creates a thread in a channel.',
    usage: 'name? | messageId? | type? | autoArchiveDuration? | invitable? | channelId? | guildId? | returnId?',
    parameters: [
        {
            name: 'Name',
            description: 'The thread name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Message ID',
            description: 'The message to assign thread.',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        },
        {
            name: 'Type',
            description: 'The thread type (public or private).',
            optional: 'true',
            defaultValue: 'public'
        },
        {
            name: 'Autoarchive duration',
            description: 'The time to autoarchive (60, 1440, 3420, 10080 or max).',
            optional: 'true',
            defaultValue: '60'
        },
        {
            name: 'Invitable',
            description: 'Whether the thread is invitable or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Channel ID',
            description: 'The channel to create the thread.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return new thread ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, name, messageId, type = 'public', autoArchiveDuration = '60', invitable = 'false', channelId = d.channel?.id, guildId = d.guild?.id, returnId = 'false') => {
        if (name == undefined) return d.throwError.required(d, 'name')

        const threadTypes = {
            public: 'GUILD_PUBLIC_THREAD',
            private: 'GUILD_PRIVATE_THREAD'
        }

        let threadType = threadTypes[type.toLowerCase()]
        if (!threadType) return d.throwError.invalid(d, 'type', type)

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