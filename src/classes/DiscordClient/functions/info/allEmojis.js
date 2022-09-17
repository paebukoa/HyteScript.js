module.exports = {
    description: 'Returns all emojis IDs from all guilds.',
    usage: 'separator?',
    parameters: [
        {
            name: 'Separator',
            description: 'Characters to separate emojis IDs.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, separator = ',') => {
        let emojis = d.client.emojis.cache.keys()

        return [...emojis].join(separator)
    }
};