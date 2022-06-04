module.exports = {
    description: 'Shows that client is "typing" in a channel;',
    usage: 'channelId?',
    parameters: [
        {
            name: 'Channel ID',
            description: 'The channel which the bot will appears as "typing".',
            optional: 'true',
            defaultValue: 'Current channel ID.'
        }
    ],
    run: async d => {
    let [channelId = d.channel?.id] = d.func.params.splits;

    let channel = d.client.channels.cache.get(channelId)
    if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

    channel.sendTyping()
}};