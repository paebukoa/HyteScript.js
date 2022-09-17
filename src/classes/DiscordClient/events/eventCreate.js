const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildScheduledEvents']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildScheduledEventCreate', async event => {
        d.commandManager.eventCreate.forEach(async commandData => {
            let data = clone(d)
    
            data.scheduledEvent = event
            data.channel = event.channel
            data.guild = event.guild
            data.author = event.creator
            data.command = commandData
            data.eventType = 'eventCreate'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}