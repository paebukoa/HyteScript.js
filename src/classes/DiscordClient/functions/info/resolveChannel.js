const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Finds a channel by the given query.',
    usage: 'query | property? | guildId?',
    parameters: [
        {
            name: 'Query',
            description: 'The information to find the channel.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The channel property.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'guildID',
            description: 'The target guild ID.',
            optional: 'true',
            defaultValue: 'global'
        }
    ],
    run: async (d, channelResolver, property = 'id', guildId = 'global') => {
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
    }
};