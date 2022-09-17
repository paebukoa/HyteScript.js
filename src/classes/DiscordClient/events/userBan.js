const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildBans']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildBanAdd', async ban => {
        d.commandManager.userBan.forEach(async commandData => {
            let data = clone(d)
    
            data.ban = ban
            data.guild = ban.guild
            data.author = ban.user
            data.command = commandData
            data.eventType = 'userBan'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}