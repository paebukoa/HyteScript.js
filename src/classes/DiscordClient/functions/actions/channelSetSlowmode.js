const { Time } = require("../../utils/utils")

module.exports = {
    description: 'Sets a slowmode for a channel.',
    usage: 'time | reason? | channelId? | guildId?',
    parameters: [
        {
            name: 'Time',
            description: 'How much slowmode time to be set.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel to set slowmode.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, time, reason, channelId = d.channel?.id, guildId = d.guild?.id) => {
        if (time == undefined) return new d.error('required', d, 'time')
        
        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        const parsedTime = Time.parseTime(time)   
        if (parsedTime.error) return new d.error("invalid", d, 'time', time)

        await channel.setRateLimitPerUser(parsedTime.ms, reason).catch(e => new d.error('custom', d, e.message))
}
};