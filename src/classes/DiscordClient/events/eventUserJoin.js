const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildScheduledEvents', 'GuildMembers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildScheduledEventUserAdd', async (event, user) => {
        d.commandManager.eventUserJoin.forEach(async commandData => {
            let data = clone(d)
    
            data.scheduledEvent = event
            data.author = user
            data.channel = event.channel
            data.guild = event.guild
            data.command = commandData
            data.eventType = 'eventUserJoin'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}