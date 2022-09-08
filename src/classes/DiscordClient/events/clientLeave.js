const { clone } = require("../utils/utils");

module.exports = async d => {
    if (!d.clientOptions.intents.includes('Guilds')) new d.error('requiredIntent', __filename, 'Guilds')

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