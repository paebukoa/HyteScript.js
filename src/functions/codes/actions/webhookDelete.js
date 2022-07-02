module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [webhookData, reason] = d.func.params.splits;

        if (webhookData == undefined) return d.throwError.func(d, `webhook ID and token field is required`)

        let [webhookId, webhookToken] = webhookData.split('/')

        let webhook = new d.djs.WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        await webhook.delete(reason)
    }
}