const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['Guilds']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename, '.js', ''), ...requiredIntents)

    d.client.on('guildCreate', async guild => {
        d.commandManager.clientJoin.forEach(async commandData => {
            let data = clone(d)

            data.guild = guild
            data.command = commandData
            data.eventType = 'clientJoin'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}