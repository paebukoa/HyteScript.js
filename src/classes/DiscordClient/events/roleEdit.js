const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('roleUpdate', async (oldRole, newRole) => {
        d.commandManager.roleEdit.forEach(async commandData => {
            let data = clone(d)
    
            data.role = newRole
            data.guild = newRole.guild
            data.command = commandData
            data.old = oldRole
            data.new = newRole
            data.newType = 'role'
            data.eventType = 'roleEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}