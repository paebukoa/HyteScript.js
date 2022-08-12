const { Data } = require("../utils/utils");

module.exports = async d => {
    d.client.on('guildMemberAdd', async (joinData) => {
        d.commandManager.userJoin.forEach(async commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.guild = joinData.guild
            data.author = joinData.user
            data.command = commandData
            data.eventType = 'userJoin'
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(data, commandData.code)
        })
    })
}