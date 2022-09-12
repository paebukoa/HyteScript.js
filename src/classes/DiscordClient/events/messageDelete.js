const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildMessages', 'MessageContent']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename, '.js', ''), ...requiredIntents)

    d.client.on('messageDelete', async message => {
        d.commandManager.messageDelete.forEach(async commandData => {
            let data = clone(d)

            let contentData = {
                args: message.content?.split?.(" ")
            }

            data.message = message
            data.guild = message.guild
            data.channel = message.channel
            data.author = message.author
            data.command = commandData
            data.eventType = 'messageDelete'
            data.args = contentData.args
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}