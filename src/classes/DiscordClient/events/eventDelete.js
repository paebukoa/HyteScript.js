const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildScheduledEvents']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildScheduledEventDelete', async event => {
        d.commandManager.eventDelete.forEach(async commandData => {
            let data = clone(d)
    
            data.scheduledEvent = event
            data.channel = event.channel
            data.guild = event.guild
            data.author = event.creator
            data.command = commandData
            data.eventType = 'eventDelete'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}