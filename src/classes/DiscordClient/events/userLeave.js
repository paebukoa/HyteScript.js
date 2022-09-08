const { clone } = require("../utils/utils")

module.exports = async d => {
    d.client.on('guildMemberRemove', async (leaveData) => {
        d.commandManager.userLeave.forEach(async commandData => {
            let data = clone(d)

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