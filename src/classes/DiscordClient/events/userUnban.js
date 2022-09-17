const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildBans']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildBanRemove', async ban => {
        d.commandManager.userUnban.forEach(async commandData => {
            let data = clone(d)
    
            data.ban = ban
            data.guild = ban.guild
            data.author = ban.user
            data.command = commandData
            data.eventType = 'userUnban'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}