const { clone } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelDelete', async channel => {
        if (channel.type === 'DM') return;

        d.commandManager.channelDelete.forEach(async commandData => {
            let data = clone(d)

            data.channel = channel
            data.guild = channel.guild
            data.command = commandData
            data.eventType = 'channelDelete'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}