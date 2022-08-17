const { parseMessage } = require("../../utils/utils");

module.exports = {
    description: 'Sends a message to a channel.',
    usage: 'message | channelId? | returnId?',
    parameters: [
        {
            name: 'Message',
            description: 'The message builder to be sent.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The channel to send message.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return message ID or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    dontParse: [0],
    run: async (d, message, channelId = d.channel?.id, returnId = 'false') => {
        if (message == undefined) return new d.error("required", d, "message")

        let channel = d.client.channels.cache.get(channelId)
        if (!channel) return new d.error("invalid", d, 'channel ID', channelId)

        let messageObj = await parseMessage(d, message)
        if (messageObj.error) return;
		
        let newMessage = await channel.send(messageObj).catch(e => new d.error("custom", d, e.message))

        return returnId === "true" ? newMessage?.id : undefined
}
};