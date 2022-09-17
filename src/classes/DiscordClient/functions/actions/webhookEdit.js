const { WebhookClient } = require('discord.js')

module.exports = {
    description: 'Edits a webhook.',
    usage: 'webhookId | webhookToken | newName? | newAvatar? | reason?',
    parameters: [
        {
            name: 'Webhook ID',
            description: 'The webhook ID.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Webhook Token',
            description: 'The webhook token.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'New name',
            description: 'The new webhook name.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'New avatar',
            description: 'The new webhook default avatar.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, webhookId, webhookToken, name, avatar, reason) => {
        if (webhookId == undefined) return new d.error("required", d, `webhook ID`)
        if (webhookToken == undefined) return new d.error("required", d, `webhook token`)

        const webhook = new WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        await webhook.edit({ name, avatar, reason}).catch(e => new d.error('custom', d, e.message))
    }
}