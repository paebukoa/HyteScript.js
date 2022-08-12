const { Data } = require("../utils/utils");

module.exports = async d => {
    d.client.on('rateLimit', rateLimitData => {
        d.commandManager.rateLimit.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.rateLimit = rateLimitData
            data.command = commandData
            data.eventType = ''
            data.err = false
            data.data = d.data.newInstance()

            data.reader.default(d, commandData.code)
        });
    })
}