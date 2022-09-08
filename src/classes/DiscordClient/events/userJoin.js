const { clone } = require("../utils/utils")

module.exports = async d => {
    d.client.on('guildMemberAdd', async (joinData) => {
        d.commandManager.userJoin.forEach(async commandData => {
            let data = clone(d)

            data.guild = joinData.guild
            data.author = joinData.user
            data.command = commandData
            data.eventType = 'userJoin'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}