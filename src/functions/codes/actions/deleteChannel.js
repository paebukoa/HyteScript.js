module.exports = {
    description: 'Deletes a channel by ID.',
    usage: 'channelId?',
    parameters: [
        {
            name: 'Channel ID',
            description: 'The channel to be deleted.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    run: async (d, channelId = d.channel?.id) => {
        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        await channel.delete().catch(e => d.throwError.func(d, e.message))
    }
}