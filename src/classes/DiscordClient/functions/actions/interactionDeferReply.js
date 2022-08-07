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
        if (!d.interaction) return d.throwError.notAllowed(d, 'interaction type')
        
        d.interaction.deferReply({ephemeral: ephemeral === 'true'})
    }
};