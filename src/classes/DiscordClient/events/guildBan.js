const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildBans']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.split('/').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildBanAdd', async ban => {
        d.commandManager.guildBan.forEach(async commandData => {
            let data = clone(d)
    
            data.ban = ban
            data.guild = ban.guild
            data.author = ban.user
            data.command = commandData
            data.eventType = 'messageDelete'
            data.args = contentData.args
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}