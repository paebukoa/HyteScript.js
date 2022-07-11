module.exports = {
    description: 'Sets a global user cooldown to the command.',
    usage: 'miliseconds | errorMessage? | userId? | channelId?',
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
            name: 'User ID',
            description: 'The user ID to set the cooldown.',
            optional: 'true',
            defaultValue: 'Author ID'
        },
        {
            name: 'Channel ID',
            description: 'The channel where the message will be sent.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    parseParams: false,
    run: async (d, ms, errorMsg, userId = d.author?.id, channelId = d.channel?.id) => {
        if (ms == undefined) return d.throwError.required(d, `miliseconds`)

        if (typeof ms === 'object') {
            let parsedMs = await ms.parse(d)
            if (parsedMs.error) return;
            ms = parsedMs.result
        }

        if (typeof userId === 'object') {
            let parsedUserId = await userId.parse(d)
            if (parsedUserId.error) return;
            userId = parsedUserId.result
        }

        if (typeof channelId === 'object') {
            let parsedChannelId = await channelId.parse(d)
            if (parsedChannelId.error) return;
            channelId = parsedChannelId.result
        }

        if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms)

        const user = d.client.users.cache.get(userId)
        if (!user) return d.throwError.invalid(d, 'user ID', userId)

        let time = d.internalDb.get('cooldown', `_user_${d.command.name}_${userId}`)
        let remainingTime = time - Date.now();

        if (!time || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + Number(ms), `_user_${d.command.name}_${userId}`)
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