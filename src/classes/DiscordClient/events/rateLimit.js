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
            data.error = false
            data.data = d.getData()

            data.reader.default(d, commandData.code)
        });
    })
}