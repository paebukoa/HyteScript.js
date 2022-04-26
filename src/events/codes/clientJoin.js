module.exports = async d => {
    d.client.on('guildCreate', guild => {
        d.commandManager.clientJoin.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.guild = guild
            data.command = commandData
            data.eventType = 'clientJoin'
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        });
    })
}