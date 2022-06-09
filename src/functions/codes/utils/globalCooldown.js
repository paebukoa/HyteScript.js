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
        let [ms, errorMsg, channelId = d.channel?.id] = d.func.params.splits;

        if (ms == undefined) return d.throwError.func(d, `miliseconds field is required`)

        const parsedMs = await d.reader.default(d, ms)
        if (parsedMs?.error) return;
        
        ms = parsedMs.result

        const parsedChannelId = await d.reader.default(d, channelId)
        if (parsedChannelId?.error) return;
        
        channelId = parsedChannelId.result

        if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms)

        let time = d.internalDb.get('cooldown', `_global_${d.command.name}`)
        let remainingTime = time - Date.now();

        if (!time || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + Number(ms), `_global_${d.command.name}`)
        } else {
            const channel = d.client.channels.cache.get(channelId)
            if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

            errorMsg = errorMsg.replaceAll('{%time}', remainingTime)

            await d.sendParsedMessage(d, errorMsg, channel)

            d.error = true
        }
    }
}