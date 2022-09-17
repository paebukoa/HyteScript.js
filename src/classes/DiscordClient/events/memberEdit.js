const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildMembers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildMemberUpdate', async (oldMember, newMember) => {
        d.commandManager.memberEdit.forEach(async commandData => {
            let data = clone(d)
    
            data.member = newMember
            data.author = newMember.user
            data.guild = newMember.guild
            data.command = commandData
            data.old = oldMember
            data.new = newMember
            data.newType = 'guildMember'
            data.eventType = 'memberEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}