const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Fetchs a user by making a request to Discord API.',
    usage: 'userId | property?',
    parameters: [
        {
            name: 'user ID',
            description: 'The user to be fetched.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to be returned if user exists.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    async run(d, userId, property = 'id') {
        if (userId == undefined) return new d.error("required", d, 'user ID')

        let user = await d.client.users.fetch(userId).catch(() => {});

        if (property.toLowerCase() == 'exists') {
            if (!user) return false;
            else return true;
        } else if (!user) return;

        return getProperty('user', user, property);
    }
};