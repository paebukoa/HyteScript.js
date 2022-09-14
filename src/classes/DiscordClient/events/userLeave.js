const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildMembers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)

    d.client.on('guildMemberRemove', async (leaveData) => {
        d.commandManager.userLeave.forEach(async commandData => {
            let data = clone(d)

            data.member = leaveData
            data.guild = leaveData.guild
            data.author = leaveData.user
            data.command = commandData
            data.eventType = 'userLeave'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}