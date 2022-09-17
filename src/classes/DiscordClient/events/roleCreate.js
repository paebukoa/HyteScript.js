const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('roleCreate', async role => {
        d.commandManager.roleCreate.forEach(async commandData => {
            let data = clone(d)
    
            data.role = role
            data.guild = role.guild
            data.command = commandData
            data.eventType = 'roleCreate'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}