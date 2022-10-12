const { Collection } = require("discord.js");
const { clone, ConditionParser } = require("../../utils/utils");

module.exports = {
    description: 'Deletes messages that are newer than 2 weeks in a channel.',
    usage: 'messageCount | channelId? | guildId?',
    parameters: [
        {
            name: 'Message count',
            description: 'How many messages to be deleted.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel to delete messages.',
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
    dontParse: [1],
    run: async (d, count, filter, channelId = d.channel?.id, guildId = d.guild?.id, returnDeletedCount = 'false') => {
        if (count == undefined) return new d.error("required", d, 'message count')

        if (isNaN(count) || Number(count) <= 0 || Number(count) > 100) return new d.error("invalid", d, 'message count', count)

        
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)
        
        const channel = guild.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        const fetchedMessages = await channel.messages.fetch({ limit: Number(count) })

        const messages = new Collection()

        for (const message of fetchedMessages.toJSON()) {
            const data = clone(d)

            data.message = message
            data.author = message.author

            let parsedFilter = await filter.parse(data)
            d.err = data.err
            d.data = data.data
            if (d.err) return;

            let result = ConditionParser.parse(d, parsedFilter.result)

            if (result) messages.set(message.id, message)
        }

        const deletedMessages = await channel.bulkDelete(messages, true).catch(e => new d.error("custom", d, e.message))

        return returnDeletedCount === 'true' ? deletedMessages?.size : undefined
    }
};