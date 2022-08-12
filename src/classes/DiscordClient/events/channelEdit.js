const { Data } = require("../utils/utils");

module.exports = async d => {
    d.client.on('channelUpdate', (oldChannel, newChannel) => {
        d.commandManager.channelEdit.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.channel = newChannel
            data.guild = newChannel.guild
            data.command = commandData
            data.newType = 'channel'
            data.old = oldChannel
            data.new = newChannel
            data.eventType = 'channelEdit'
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(data, commandData.code)
        });
    })
}