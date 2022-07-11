
module.exports = {
    description: 'Sets a guild cooldown to the command.',
    usage: 'miliseconds | errorMessage? | guildId? | channelId?',
    parameters: [
        {
            name: 'Miliseconds',
            description: 'Amount of time in miliseconds.',
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
    run: async (d, ms, errorMsg, guildId = d.guild?.id, channelId = d.channel?.id) => {
        if (ms == undefined) return d.throwError.required(d, `miliseconds`)

        if (typeof ms === 'object') {
            let parsedMs = await ms.parse(d)
            if (parsedMs.error) return;
            ms = parsedMs.result
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

        if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        let time = d.internalDb.get('cooldown', `_guild_${d.command.name}_${guildId}`)
        let remainingTime = time - Date.now();

        if (!time || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + Number(ms), `_guild_${d.command.name}_${guildId}`)
        } else if (errorMsg !== undefined) {
            const channel = d.client.channels.cache.get(channelId)
            if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

            errorMsg = errorMsg.replaceAll('{%time}', remainingTime)

            let messageObj = await d.utils.parseMessage(d, errorMsg)
            if (messageObj.error) return;

            channel.send(messageObj)

            d.error = true
        }
    }
}