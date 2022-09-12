const { getProperty } = require("../../utils/utils");

module.exports = async d => {
    let [channelResolver, property = 'id', guildId = 'global'] = d.function.parameters;
    
    let channel;

    if (guildId === 'global') {
        channel = d.client.channels.cache.find(channel => [channel.id, channel.name.toLowerCase(), channel.toString()].includes(channelResolver?.toLowerCase()))
    } else {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        channel = guild.channels.cache.find(channel => [channel.id, channel.name.toLowerCase(), channel.toString()].includes(channelResolver?.toLowerCase()))
    }

    if (!channel) return;

    return getProperty('channel', channel, property)
};