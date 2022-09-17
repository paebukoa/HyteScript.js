const { clone, replaceLast } = require("../utils/utils")

module.exports = async d => {
    let requiredIntents = ['GuildScheduledEvents']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('guildScheduledEventUpdate', async (oldEvent, newEvent) => {
        d.commandManager.eventEdit.forEach(async commandData => {
            let data = clone(d)
    
            data.scheduledEvent = newEvent
            data.channel = newEvent.channel
            data.guild = newEvent.guild
            data.author = newEvent.creator
            data.command = commandData
            data.old = oldEvent
            data.new = newEvent
            data.newType = 'scheduledEvent'
            data.eventType = 'eventEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        })
    })
}