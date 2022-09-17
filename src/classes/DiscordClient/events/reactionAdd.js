const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {

    console.log('ok')
    let requiredIntents = ['GuildMessages', 'GuildMembers', 'GuildMessageReactions']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('messageReactionAdd', async (reaction, user) => {
        console.log('message reacted')

        d.commandManager.reactionAdd.forEach(async commandData => {
            let data = clone(d)
    
            data.reaction = reaction
            data.message = reaction.message
            data.channel = reaction.message.channel
            data.guild = reaction.message.guild
            data.author = user
            data.command = commandData
            data.eventType = 'reactionAdd'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}