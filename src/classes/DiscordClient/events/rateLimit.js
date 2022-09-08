const { clone } = require("../utils/utils");

module.exports = async d => {
    d.client.on('rateLimit', async rateLimitData => {
        d.commandManager.rateLimit.forEach(async commandData => {
            let data = clone(d)

            data.rateLimit = rateLimitData
            data.command = commandData
            data.eventType = ''
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}