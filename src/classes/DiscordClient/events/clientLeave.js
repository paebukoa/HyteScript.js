const { Data } = require("../utils/utils");

module.exports = async d => {
    d.client.on('guildDelete', guild => {
        d.commandManager.clientLeave.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.guild = guild;
            data.command = commandData
            data.eventType = 'clientLeave'
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(data, commandData.code)
        });
    })
}