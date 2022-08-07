module.exports = async d => {
    d.client.on('messageDelete', message => {
        d.commandManager.messageDelete.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            let contentData = {
                args: message.content?.split?.(" ")
            }

            data.message = message
            data.guild = message.guild
            data.channel = message.channel
            data.author = message.author
            data.command = commandData
            data.eventType = 'messageDelete'
            data.args = contentData.args
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        });
    })
}