const { parseMessage } = require("../../utils/utils")

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
    dontParse: [2],
    run: async (d, webhookId, webhookToken, message, username, avatar, returnId = 'false') => {
        if (webhookId == undefined) return new d.error("required", d, `webhook ID`)
        if (webhookToken == undefined) return new d.error("required", d, `webhook token`)
        if (message == undefined) return new d.error("required", d, 'message')
        
        const webhook = new WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        let messageObj = await parseMessage(d, message)
        if (messageObj.error) return;
        messageObj.username = username
        messageObj.avatarURL = avatar
        let newMessage = await webhook.send(messageObj)

        return returnId == 'true' ? newMessage?.id : undefined 
    }
}