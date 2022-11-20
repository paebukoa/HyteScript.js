const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Finds a user by the given query.',
    usage: 'query | property?',
    parameters: [
        {
            name: 'Query',
            description: 'The information to find the user.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The channel property.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    run: async (d, userResolver, property = 'id') => {
        let user = d.client.users.cache.find(user => [user.id, user.username.toLowerCase(), user.tag.toLowerCase(), user.toString()].includes(userResolver?.toLowerCase()))
        if (!user) return;

        return getProperty('user', user, property)
    }
};