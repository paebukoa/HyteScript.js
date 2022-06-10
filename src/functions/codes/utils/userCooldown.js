//dontParseParams

module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [ms, errorMsg, userId = d.author?.id, channelId = d.channel?.id] = d.func.params.splits;

        if (ms == undefined) return d.throwError.func(d, `miliseconds field is required`)

        const parsedMs = await d.reader.default(d, ms)
        if (parsedMs?.error) return;
        
        ms = parsedMs.result

        const parsedChannelId = await d.reader.default(d, channelId)
        if (parsedChannelId?.error) return;
        
        channelId = parsedChannelId.result

        const parsedUserId = await d.reader.default(d, userId)
        if (parsedUserId?.error) return;
        
        userId = parsedUserId.result

        if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms)

        const user = d.client.users.cache.get(userId)
        if (!user) return d.throwError.invalid(d, 'user ID', userId)

        let time = d.internalDb.get('cooldown', `_user_${d.command.name}_${userId}`)
        let remainingTime = time - Date.now();

        if (!time || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + Number(ms), `_user_${d.command.name}_${userId}`)
        } else {
            const channel = d.client.channels.cache.get(channelId)
            if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

            errorMsg = errorMsg.replaceAll('{%time}', remainingTime)

            await d.sendParsedMessage(d, errorMsg, channel)

            d.error = true
        }
    }
}