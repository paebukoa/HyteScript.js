const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildMembers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename, '.js', ''), ...requiredIntents)

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