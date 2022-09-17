const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, userResolver, property = 'id') => {
        let user = d.client.users.cache.find(user => [user.id, user.username.toLowerCase(), user.tag.toLowerCase(), user.toString()].includes(userResolver?.toLowerCase()))
        if (!user) return;

        return getProperty('user', user, property)
    }
};