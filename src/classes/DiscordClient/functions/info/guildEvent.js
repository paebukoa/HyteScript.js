const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a guild event property.',
    usage: 'property? | eventId? | guildId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from event.',
            optional: 'true',
            defaultValue: 'id'
        },
        {
            name: 'Event ID',
            description: 'The event to get property.',
            optional: 'true',
            defaultValue: 'Current event ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the event belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    async run(d, property = 'id', eventId = d.scheduledEvent?.id, guildId = d.guild?.id) {
        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

        let scheduledEvent = guild.scheduledEvents.cache.get(eventId)
        if (!scheduledEvent) return new d.error('invalid', d, 'event ID', eventId)

        return getProperty('scheduledEvent', scheduledEvent, property)        
    }
};