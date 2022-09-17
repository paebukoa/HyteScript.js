module.exports = {
    description: 'Returns all channels IDs from all guilds.',
    usage: 'separator?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate channels IDs.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, separator = ',') => {
        let channels = (await d.client.channels.fetch()).keys()

        return [...channels].join(separator)
    }
};