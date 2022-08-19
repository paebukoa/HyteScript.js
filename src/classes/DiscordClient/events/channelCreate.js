const { Data, clone } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelCreate', channel => {
        d.commandManager.channelCreate.forEach(commandData => {
            let data = clone(d)

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