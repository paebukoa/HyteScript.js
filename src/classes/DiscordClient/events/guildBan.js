const { clone } = require("../utils/utils")

module.exports = async d => {
    if (!d.clientOptions.intents.includes('Guilds')) new d.error('requiredIntent', __filename, 'GuildBans')
    
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