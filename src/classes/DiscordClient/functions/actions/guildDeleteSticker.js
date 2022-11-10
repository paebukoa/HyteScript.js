module.exports = {
    description: 'Creates a sticker in a guild.',
    usage: 'stickerId? | guildId? | reason?',
    parameters: [
        {
            name: 'Sticker ID',
            description: 'The sticker to be deleted.',
            optional: 'true',
            defaultValue: 'Current sticker ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild where the sticker will be created.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run(d, name, description, url, emoji, guildId = d.guild?.id, returnId = 'false', reason) {
        
    }
}