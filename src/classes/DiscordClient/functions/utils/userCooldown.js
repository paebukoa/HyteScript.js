const Time = require("../../../codings/time");

module.exports = {
    description: 'Sets a global user cooldown to the command.',
    usage: 'time | errorMessage? | userId? | channelId?',
    parameters: [
        {
            name: 'Time',
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
    run: async (d, time, errorMsg, userId = d.author?.id, channelId = d.channel?.id) => {
        if (time == undefined) return d.throwError.required(d, `time`)

        if (typeof time === 'object') {
            let parsedTime = await time.parse(d)
            if (parsedTime.error) return;
            time = parsedTime.result
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

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return d.throwError.invalid(d, 'time', time)

        const user = d.client.users.cache.get(userId)
        if (!user) return d.throwError.invalid(d, 'user ID', userId)

        let cooldownTime = d.internalDb.get('cooldown', `_user_${d.command.name}_${userId}`)
        let remainingTime = cooldownTime - Date.now();

        if (!cooldownTime || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + parsedTime.ms, `_user_${d.command.name}_${userId}`)
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