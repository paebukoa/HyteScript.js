module.exports = async d => {
    d.client.on('messageUpdate', (newMessage, oldMessage) => {
        d.commandManager.messageEdit.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            let contentData = {
                args: newMessage.content.split(" ")
            }

            data.message = newMessage
            data.guild = newMessage.guild
            data.channel = newMessage.channel
            data.author = newMessage.author
            data.command = commandData
            data.newType = 'message'
            data.new = newMessage
            data.old = oldMessage
            data.eventType = 'messageEdit'
            data.args = contentData.args
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        });
    })
}