const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Edits a client message.',
    usage: 'message | messageId | replaceEmpty? | channelId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message to replace the old message (supports functions that set a message option).',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Message ID',
            description: 'The message ID to be edited.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Replace empty',
            description: 'Whether to replace empty fields, such as components, embed...',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Channel ID',
            description: 'The channel which the message belongs to.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        }
    ],
    dontParse: [0],
    run: async (d, message, messageId, replaceEmpty = 'false', channelId = d.channel?.id) => {
        if (message == undefined) return new d.error("required", d, 'message')
        if (messageId == undefined) return new d.error("required", d, 'message ID')

        const channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        const clientMessage = await channel.messages.fetch(messageId)
        if (!clientMessage) return new d.error("custom", d, 'invalid message ID or message is not cached')

        let messageObj = await parseMessage(d, message, replaceEmpty != 'true')
        if (messageObj.error) return;

        await clientMessage.edit(messageObj).catch(e => new d.error("custom", d, e.message))
    }
}