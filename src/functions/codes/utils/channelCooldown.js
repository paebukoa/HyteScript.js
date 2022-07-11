
module.exports = {
    description: 'Sets a channel cooldown to the command.',
    usage: 'miliseconds | errorMessage? | cooldownChannelId? | channelId?',
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
            name: 'Cooldown channel ID',
            description: 'The channel ID to set the cooldown.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel where the message will be sent.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    parseParams: false,
    run: async (ms, errorMsg, cooldownChannelId = d.channel?.id, channelId = d.channel?.id) => {
        if (ms == undefined) return d.throwError.required(d, `miliseconds`)

        if (typeof ms === 'object') {
            let parsedMs = await ms.parse(d)
            if (parsedMs.error) return;
            ms = parsedMs.result
        }

        if (typeof cooldownChannelId === 'object') {
            let parsedCooldownChannelId = await cooldownChannelId.parse(d)
            if (parsedCooldownChannelId.error) return;
            cooldownChannelId = parsedCooldownChannelId.result
        }

        if (typeof channelId === 'object') {
            let parsedChannelId = await channelId.parse(d)
            if (parsedChannelId.error) return;
            channelId = parsedChannelId.result
        }

        if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms)

        const cooldownChannel = d.client.channels.cache.get(cooldownChannelId)
        if (!cooldownChannel) return d.throwError.invalid(d, 'cooldown channel ID', cooldownChannelId)

        let time = d.internalDb.get('cooldown', `_channel_${d.command.name}_${cooldownChannelId}`)
        let remainingTime = time - Date.now();

        if (!time || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + Number(ms), `_channel_${d.command.name}_${cooldownChannelId}`)
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