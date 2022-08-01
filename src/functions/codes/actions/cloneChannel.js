module.exports = {
    description: 'Clones a channel.',
    usage: 'name? | channelId? | guildId?',
    parameters: [
        {
            name: 'Name',
            description: 'The name of the channel clone (leave empty if new name is not needed).',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel to be cloned.',
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
    run: async (d, name, channelId = d.channel?.id, guildId = d.guild?.id) => {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const channel = guild.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        channel.clone({name}).catch(e => d.throwError.func(d, e.message))
    }
};