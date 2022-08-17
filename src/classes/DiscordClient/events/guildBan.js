const { cloneObject } = require("../utils/utils")

module.exports = async d => {
    d.client.on('guildBanAdd', ban => {
        d.commandManager.guildBan.forEach(commandData => {
            let data = cloneObject(d)
    
            data.ban = ban
            data.guild = ban.guild
            data.author = ban.user
            data.command = commandData
            data.eventType = 'messageDelete'
            data.args = contentData.args
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(data, commandData.code)
        })
    })
}