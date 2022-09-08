const { clone } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelCreate', async channel => {
        d.commandManager.channelCreate.forEach(async commandData => {
            let data = clone(d)

            data.channel = channel
            data.guild = channel.guild
            data.command = commandData
            data.eventType = 'channelCreate'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}