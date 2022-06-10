module.exports = async d => {
    d.client.on('channelDelete', channel => {
        if (channel.type === 'DM') return;

        d.commandManager.channelDelete.forEach(commandData => {
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
            data.eventType = 'channelDelete'
            data.error = false
            data.data = data.getData()

            data.reader.default(data, commandData.code)
            });
    })
}