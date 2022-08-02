module.exports = {
    description: 'Shows that client is "typing" in a channel.',
    usage: 'channelId?',
    parameters: [
        {
            name: 'Channel ID',
            description: 'The channel which the bot will appears as "typing".',
            optional: 'true',
            defaultValue: 'Current channel ID.'
        }
    ],
    run: async (d, channelId = d.channel?.id) => {
    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    channel.sendTyping().catch(e => d.throwError.func(d, e.message))
}};