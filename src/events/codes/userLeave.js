module.exports = async d => {
    d.client.on('guildMemberRemove', async (leaveData) => {
        d.commandManager.userLeave.forEach(async commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.guild = leaveData.guild
            data.author = leaveData.user
            data.command = commandData
            data.eventType = 'userLeave'
            data.error = false
            data.data = data.getData()

            data.reader.default(data, commandData.code)
        })
    })
}