module.exports = {
    description: 'Sends a message with a webhook.',
    usage: 'webhookId | webhookToken | message | username? | avatar? | returnId?',
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
            name: 'Message',
            description: 'The message builder to be sent.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Username',
            description: 'The webhook message username.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Avatar',
            description: 'The webhook message avatar.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Return ID',
            description: 'Whether to return message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    parseParams: false,
    run: async (d, webhookId, webhookToken, message, username, avatar, returnId = 'false') => {
        if (webhookId == undefined) return d.throwError.required(d, `webhook ID`)
        if (webhookToken == undefined) return d.throwError.required(d, `webhook token`)
        if (message == undefined) return d.throwError.required(d, 'message')

        if (typeof webhookId === 'object') {
            let parsedwebhookId = await webhookId.parse(d)
            if (parsedwebhookId.error) return;
            webhookId = parsedwebhookId.result
        }

        if (typeof webhookToken === 'object') {
            let parsedwebhookToken = await webhookToken.parse(d)
            if (parsedwebhookToken.error) return;
            webhookToken = parsedwebhookToken.result
        }

        if (typeof username === 'object') {
            let parsedusername = await username.parse(d)
            if (parsedusername.error) return;
            username = parsedusername.result
        }

        if (typeof avatar === 'object') {
            let parsedavatar = await avatar.parse(d)
            if (parsedavatar.error) return;
            avatar = parsedavatar.result
        }

        if (typeof returnId === 'object') {
            let parsedreturnId = await returnId.parse(d)
            if (parsedreturnId.error) return;
            returnId = parsedreturnId.result
        }
        
        const webhook = new WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        let messageObj = await d.utils.parseMessage(d, message)
        if (messageObj.error) return;
        messageObj.username = username
        messageObj.avatarURL = avatar
        let newMessage = await webhook.send(messageObj)

        return returnId == 'true' ? newMessage?.id : undefined 
    }
}