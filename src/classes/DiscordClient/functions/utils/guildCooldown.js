const Time = require("../../../codings/time");

module.exports = {
    description: 'Sets a guild cooldown to the command.',
    usage: 'time | errorMessage? | guildId? | channelId?',
    parameters: [
        {
            name: 'time',
            description: 'The cooldown time.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Error message',
            description: 'Message to be sent when command is on cooldown.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild ID to set the cooldown.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel where the message will be sent.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    parseParams: false,
    run: async (d, time, errorMsg, guildId = d.guild?.id, channelId = d.channel?.id) => {
        if (time == undefined) return d.throwError.required(d, `time`)

        if (typeof time === 'object') {
            let parsedTime = await time.parse(d)
            if (parsedTime.error) return;
            time = parsedTime.result
        }

        if (typeof guildId === 'object') {
            let parsedGuildId = await guildId.parse(d)
            if (parsedGuildId.error) return;
            guildId = parsedGuildId.result
        }

        if (typeof channelId === 'object') {
            let parsedChannelId = await channelId.parse(d)
            if (parsedChannelId.error) return;
            channelId = parsedChannelId.result
        }

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return d.throwError.invalid(d, 'time', time)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        let cooldownTime = d.internalDb.get('cooldown', `_guild_${d.command.name}_${guildId}`)
        let remainingTime = cooldownTime - Date.now();

        if (!cooldownTime || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + parsedTime.ms, `_guild_${d.command.name}_${guildId}`)
        } else if (errorMsg !== undefined) {
            const channel = d.client.channels.cache.get(channelId)
            if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

            let msgData = d.utils.duplicate(d)

            const placeholders = d.data.placeholders.slice(0)

            msgData.data.placeholders.push(
                {name: '{timeMs}', value: remainingTime},
                {name: '{timeFull}', value: Time.parseMs(remainingTime).full},
                {name: '{time}', value: Time.parseMs(remainingTime).sum}
            )

            const messageObj = await d.utils.parseMessage(msgData, errorMsg)
            d.error = msgData.error
            if (messageObj.error) return;
            
            Object.assign(d.data, msgData.data)
            d.data.placeholders = placeholders

            channel.send(messageObj)

            d.error = true
        }
    }
}