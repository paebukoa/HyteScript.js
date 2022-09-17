const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a property of a mentioned user.',
    usage: 'index? | property?',
    parameters: [
        {
            name: 'Index',
            description: 'The index of the mentioned user.',
            optional: 'true',
            defaultValue: '1'
        },
        {
            name: 'Property',
            description: 'The user property to be returned.',
            optional: 'true',
            defaultValue: 'ID'
        }
    ],
    run: async (d, index = '1', property = 'id') => {
        if (isNaN(index) || Number(index) === 0) return new d.error("invalid", d, 'index', index);

        const mentions = [...d.message.mentions.users.values()];
        const userData = Number(index) > 0 ? mentions.at(Number(index) - 1) : mentions.at(Number(index)); 

        if (!userData) return;

        return getProperty('user', userData, property)
    }
};