const { Data, cloneObject } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelCreate', channel => {
        d.commandManager.channelCreate.forEach(commandData => {
            let data = cloneObject(d)

            data.channel = channel
            data.guild = channel.guild
            data.command = commandData
            data.eventType = 'channelCreate'
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(data, commandData.code)
            });
    })
}