const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildUpdate', async (oldGuild, newGuild) => {
        d.commandManager.guildEdit.forEach(async commandData => {
            let data = clone(d)
    
            data.guild = newGuild
            data.command = commandData
            data.old = oldGuild
            data.new = newGuild
            data.newType = 'guild'
            data.eventType = 'guildEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}