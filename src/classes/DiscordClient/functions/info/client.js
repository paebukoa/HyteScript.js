const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a property from the client.',
    usage: 'property?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from client.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, property = 'id') => {
    return getProperty('client', d.client, property)
}}