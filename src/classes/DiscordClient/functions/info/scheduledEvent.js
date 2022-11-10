const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a property from a server event.',
    usage: 'property | eventId? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to be returned.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Event ID',
            description: 'The event ID to get property.',
            optional: 'true',
            defaultValue: 'Current event ID'
        },
        {
            name: 'Guild ID',
            description: 'the guild which the event belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    async run(d, property = 'id', eventId = d.scheduledEvent?.id, guildId = d.guild?.id) {
        let guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)
        
        let event = guild.scheduledEvents.cache.get(eventId)
        if (!event) return new d.error('invalid', d, 'event ID', eventId)

        return getProperty('scheduledEvent', event, property)
    }
}