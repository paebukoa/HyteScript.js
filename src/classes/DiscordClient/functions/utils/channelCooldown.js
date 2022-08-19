const { Time, clone, parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Sets a channel cooldown to the command.',
    usage: 'time | errorMessage? | cooldownChannelId? | channelId?',
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
    dontParse: [1],
    run: async (time, errorMsg, cooldownChannelId = d.channel?.id, channelId = d.channel?.id) => {
        if (time == undefined) return new d.error("required", d, `time`)

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return new d.error("invalid", d, 'time', time)

        const cooldownChannel = d.client.channels.cache.get(cooldownChannelId)
        if (!cooldownChannel) return new d.error("invalid", d, 'cooldown channel ID', cooldownChannelId)

        let cooldownTime = d.internalDb.get('cooldown', `_channel_${d.command.name}_${cooldownChannelId}`)
        let remainingTime = cooldownTime - Date.now();

        if (!cooldownTime || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + parsedTime.ms, `_channel_${d.command.name}_${cooldownChannelId}`)
        } else if (errorMsg !== undefined) {
            const channel = d.client.channels.cache.get(channelId)
            if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

            let msgData = clone(d)

            const placeholders = d.data.placeholders.slice(0)

            msgData.data.placeholders.push(
                {name: '{timeMs}', value: remainingTime},
                {name: '{timeFull}', value: Time.parseMs(remainingTime).full},
                {name: '{time}', value: Time.parseMs(remainingTime).sum}
            )

            const messageObj = await parseMessage(msgData, errorMsg)
            d.err = msgData.err
            if (messageObj.error) return;
            
            Object.assign(d.data, msgData.data)
            d.data.placeholders = placeholders

            channel.send(messageObj)

            d.err = true
        }
    }
}