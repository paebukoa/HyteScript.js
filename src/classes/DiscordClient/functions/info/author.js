const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a property from the author.',
    usage: 'property?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from author.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    run: async (d, property = 'id') => {
        return getProperty('user', d.author, property)
    }
};