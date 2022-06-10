module.exports = async d => {
    d.client.on('channelCreate', channel => {
        d.commandManager.channelCreate.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.channel = channel
            data.guild = channel.guild
            data.command = commandData
            data.eventType = 'channelCreate'
            data.error = false
            data.data = data.getData()

            data.reader.default(data, commandData.code)
            });
    })
}