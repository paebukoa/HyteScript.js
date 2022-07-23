const { WebhookClient } = require('discord.js')

module.exports = {
    description: 'Deletes a webhook.',
    usage: 'webhookId | webhookToken | reason?',
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
            name: 'Reason',
            description: 'The reason to be shown in audit logs.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, webhookId, webhookToken, reason) => {
        if (webhookId == undefined) return d.throwError.required(d, `webhook ID`)
        if (webhookToken == undefined) return d.throwError.required(d, `webhook token`)

        const webhook = new WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        await webhook.delete(reason)
    }
}