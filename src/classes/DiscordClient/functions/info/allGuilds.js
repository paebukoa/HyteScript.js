module.exports = {
    description: 'Returns all guilds IDs that the client is in.',
    usage: 'separator?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate guilds IDs.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, separator = ',') => {
        let guilds = (await d.client.guilds.fetch()).keys()

        return [...guilds].join(separator)
    }
};