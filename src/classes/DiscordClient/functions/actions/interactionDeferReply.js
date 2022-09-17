module.exports = {
    description: 'Sends "<client> is thinking..." status and makes interaction token don\'t expire. Note that it will make interaction as "replied", so to reply to the interaction you\'ll need to use #(interactionEditReply).',
    usage: 'ephemeral?',
    parameters: [
        {
            name: 'Ephemeral',
            description: 'Whether to send a ephemeral defer reply or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, ephemeral = 'false') => {
        if (!d.interaction) return new d.error("notAllowed", d, 'interaction type')
        
        await d.interaction.deferReply({ephemeral: ephemeral === 'true'}).catch(e => new d.error('custom', d, e.message))
    }
};