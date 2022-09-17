module.exports = {
    description: 'Returns all users IDs from all guilds.',
    usage: 'separator?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate users IDs.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, separator = ',') => {
        let users = (await d.client.users.fetch()).keys()

        return [...users].join(separator)
    }
};