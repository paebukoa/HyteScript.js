const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildMembers']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)

    d.client.on('guildMemberAdd', async (joinData) => {
        d.commandManager.userJoin.forEach(async commandData => {
            let data = clone(d)

            data.member = joinData
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