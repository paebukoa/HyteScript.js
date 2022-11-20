const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Returns a user property.',
    usage: 'property | userId?',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from user.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'User ID',
            description: 'The user which property will be get.',
            optional: 'false',
            defaultValue: 'Author\'s ID'
        }
    ],
    run: async (d, property = "id", userId = d.author?.id) => {
        const userData = d.client.users.cache.get(userId);

        if (property === "exists") return userData ? true : false;

        if (!userData) return new d.error("invalid", d, "user ID", userId);

        return getProperty('user', userData, property)
    }
}

