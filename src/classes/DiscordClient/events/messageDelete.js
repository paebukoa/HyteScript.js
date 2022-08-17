const { Data, cloneObject } = require("../utils/utils");

module.exports = async d => {
    d.client.on('messageDelete', message => {
        d.commandManager.messageDelete.forEach(commandData => {
            let data = cloneObject(d)

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

            data.reader.default(data, commandData.code)
        });
    })
}