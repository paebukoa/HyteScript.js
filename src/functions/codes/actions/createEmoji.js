module.exports = {
    description: 'Creates a emoji in a guild.',
    usage: 'name | url | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The emoji name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The emoji URL image.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, url, reason) => {
    }
};