module.exports = async d => {
    d.client.on("messageCreate", async message => {

        if (message.author.bot && d.options.respondBots != true) return;
        
        let ignoringPrefix = new Map()
        let defaults = new Map()

        d.commandManager.default.forEach((commandData, commandName) => {
            if (commandData.ignorePrefix === true) ignoringPrefix.set(commandName, commandData)
            else defaults.set(commandName, commandData)
        })

        d.commandManager.alwaysExecute.forEach(async commandData => {

            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            if (!commandData.executeOnDM && message.channel.type === 'DM') return;

            let contentData = {
                args: message.content.split(" ")
            }

            data.message = message
            data.channel = message.channel
            data.guild = message.guild
            data.author = message.author
            data.command = commandData
            data.eventType = 'default'
            data.args = contentData.args
            data.error = false
            data.data = data.getData()

            const readerData = await data.reader.default(data, commandData.code)

            if (readerData.error) return;

            let messageObj = {
                content: readerData.result.unescape(),
                components: readerData.data.components,
                embeds: readerData.data.embeds
            }

            if (messageObj.content.replaceAll('\n', '').trim() === '') return;

            data.channel.send(messageObj)

        })

        ignoringPrefix.forEach(async (commandData, commandName) => {

            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }
                
            if (!commandData.executeOnDM && message.channel.type === 'DM') return;

            let contentData = {
                name: message.content.split(" ")[0],
                args: message.content.split(" ").slice(1)
            }

            if (commandName !== contentData.name.toLowerCase()) return;

            data.message = message
            data.channel = message.channel
            data.guild = message.guild
            data.author = message.author
            data.command = commandData
            data.eventType = 'default'
            data.args = contentData.args
            data.error = false
            data.data = data.getData()

            const readerData = await data.reader.default(data, commandData.code)

            if (readerData.error) return;

            let messageObj = {
                content: readerData.result.unescape(),
                components: readerData.data.components,
                embeds: readerData.data.embeds
            }

            if (messageObj.content.replaceAll('\n', '').trim() === '') return;

            data.channel.send(messageObj)
        })

        defaults.forEach(async (commandData, commandName) => {

            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }
                
            if (!commandData.executeOnDM && message.channel.type === 'DM') return;

            if (!message.content.startsWith(data.options.prefix)) return;

            let contentData = {
                name: message.content.split(" ")[0].replace(data.options.prefix, ''),
                args: message.content.split(" ").slice(1)
            }

            if (commandName !== contentData.name.toLowerCase()) return;

            data.message = message
            data.channel = message.channel
            data.guild = message.guild
            data.author = message.author
            data.command = commandData
            data.eventType = 'default'
            data.args = contentData.args
            data.error = false
            data.data = data.getData()

            const readerData = await data.reader.default(data, commandData.code)

            if (readerData.error) return

            let messageObj = {
                content: readerData.result.unescape(),
                components: readerData.data.components,
                embeds: readerData.data.embeds
            }

            if (messageObj.content.replaceAll('\n', '').trim() === '') return;

            data.channel.send(messageObj)
        })
    });
};