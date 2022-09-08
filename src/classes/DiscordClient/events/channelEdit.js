const { clone } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelUpdate', async (oldChannel, newChannel) => {
        d.commandManager.channelEdit.forEach(async commandData => {
            let data = clone(d)

            data.channel = newChannel
            data.guild = newChannel.guild
            data.command = commandData
            data.newType = 'channel'
            data.old = oldChannel
            data.new = newChannel
            data.eventType = 'channelEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}