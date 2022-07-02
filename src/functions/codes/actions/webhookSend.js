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
    parseParams: false,
    run: async d => {
        let [webhookData, message, username, avatar, returnId = 'false'] = d.func.params.splits;

        if (webhookData == undefined) return d.throwError.func(d, 'webhook ID and token field is required')

        let parsedWebhookData = await d.reader.default(d, webhookData)
        if (parsedWebhookData?.error) return;

        webhookData = parsedWebhookData.result

        if (message == undefined) return d.throwError.func(d, 'message field is required')

        let [webhookId, webhookToken] = webhookData.split('/')
        
        const webhook = new d.djs.WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        if (username != undefined) {
            let parsedUsername = await d.reader.default(d, username)
            if (parsedUsername?.error) return;
            
            username = parsedUsername.result
        }
            
        if (avatar != undefined) {
            let parsedAvatar = await d.reader.default(d, avatar)
            if (parsedAvatar?.error) return;
            
            avatar = parsedAvatar.result
        }

        let parsedMessage = await d.parseMessage(d, message)
        if (!parsedMessage) return;

        parsedMessage.username = username;
        parsedMessage.avatarURL = avatar;

        let newMessage = await webhook.send(parsedMessage)

        return returnId == 'true' ? newMessage?.id : undefined 
    }
}