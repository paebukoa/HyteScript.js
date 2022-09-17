const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('roleDelete', async role => {
        d.commandManager.roleDelete.forEach(async commandData => {
            let data = clone(d)
    
            data.role = role
            data.guild = role.guild
            data.command = commandData
            data.eventType = 'roleDelete'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}