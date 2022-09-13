const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)

    d.client.on('guildDelete', async guild => {
        d.commandManager.clientLeave.forEach(async commandData => {
            let data = clone(d)

            data.guild = guild;
            data.command = commandData
            data.eventType = 'clientLeave'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}