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
        let [name, avatar, channelId = d.channel?.id, returnData = 'true', reason] = d.func.params.splits;

        if (name == undefined) return d.throwError.func(d, 'name field is required')
        if (avatar?.trim?.() === '') avatar = undefined

        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return d.throwError.invalid(d, 'channel ID', channelId)

        let newWebhook = await channel.createWebhook(name, {avatar, reason}).catch(e => {
            return d.throwError.func(d, e.message)
        })

        return returnData === 'true' ? `${newWebhook?.id}/${newWebhook.token}` : undefined
    }
}