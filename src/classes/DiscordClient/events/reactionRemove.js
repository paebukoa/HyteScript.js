const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildMessages', 'GuildMembers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('messageReactionRemove', async (reaction, user) => {
        d.commandManager.reactionRemove.forEach(async commandData => {
            let data = clone(d)
    
            data.reaction = reaction
            data.message = reaction.message
            data.channel = reaction.message.channel
            data.guild = reaction.message.guild
            data.author = user
            data.command = commandData
            data.eventType = 'reactionRemove'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}