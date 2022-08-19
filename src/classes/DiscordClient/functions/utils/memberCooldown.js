const { Time, parseMessage, clone } = require("../../utils/utils");

module.exports = {
    description: 'Sets a guild member cooldown to the command.',
    usage: 'time | errorMessage? | memberId? | guildId? | channelId?',
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
            name: 'Member ID',
            description: 'The guild member ID to set the cooldown.',
            optional: 'true',
            defaultValue: 'Author ID'
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
    dontParse: [1],
    run: async (d, time, errorMsg, memberId = d.author?.id, guildId = d.guild?.id, channelId = d.channel?.id) => {
        if (time == undefined) return new d.error("required", d, `time`)

        if (typeof time === 'object') {
            let parsedTime = await time.parse(d)
            if (parsedTime.error) return;
            time = parsedTime.result
        }

        if (typeof memberId === 'object') {
            let parsedMemberId = await memberId.parse(d)
            if (parsedMemberId.err) return;
            memberId = parsedMemberId.result
        }

        if (typeof guildId === 'object') {
            let parsedGuildId = await guildId.parse(d)
            if (parsedGuildId.err) return;
            guildId = parsedGuildId.result
        }

        if (typeof channelId === 'object') {
            let parsedChannelId = await channelId.parse(d)
            if (parsedChannelId.err) return;
            channelId = parsedChannelId.result
        }

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return new d.error("invalid", d, 'time', time)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const member = guild.members.cache.get(memberId)
        if (!member) return new d.error("invalid", d, 'member ID', memberId)

        let cooldownTime = d.internalDb.get('cooldown', `_member_${d.command.name}_${memberId}_${guildId}`)
        let remainingTime = cooldownTime - Date.now();

        if (!cooldownTime || remainingTime < 1) {
            d.internalDb.set('cooldown', Date.now() + parsedTime.ms, `_member_${d.command.name}_${memberId}_${guildId}`)
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