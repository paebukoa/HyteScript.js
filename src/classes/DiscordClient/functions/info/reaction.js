const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a message reaction property. Exclusive for reactionAdd and reactionRemove events.',
    usage: 'property?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from reaction.',
            optional: 'true',
            defaultValue: 'emoji'
        }
    ],
    async run(d, property = 'emoji') {
        if (!['reactionAdd', 'reactionRemove'].includes(d.eventType)) return new d.error('notAllowed', d, 'reactionAdd and reactionRemove events.')

        return getProperty('reaction', d.reaction, property)        
    }
};