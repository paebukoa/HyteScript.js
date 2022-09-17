const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildMessages', 'MessageContent']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)

    d.client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (oldMessage.content === newMessage.content) return;

        d.commandManager.messageEdit.forEach(async commandData => {
            let data = clone(d)

            let contentData = {
                args: newMessage.content.split(" ")
            }

            data.message = newMessage
            data.guild = newMessage.guild
            data.channel = newMessage.channel
            data.author = newMessage.author
            data.command = commandData
            data.newType = 'message'
            data.old = oldMessage
            data.new = newMessage
            data.eventType = 'messageEdit'
            data.args = contentData.args
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}