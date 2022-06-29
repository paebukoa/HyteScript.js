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

            if (messageObj.content.replaceAll('\n', '').trim() === '') delete messageObj.content;

            if (JSON.stringify(messageObj.embeds) === '[]' && JSON.stringify(messageObj.components) === '[]' && messageObj.content == undefined) return;

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

            if (messageObj.content.replaceAll('\n', '').trim() === '') delete messageObj.content;

            if (JSON.stringify(messageObj.embeds) === '[]' && JSON.stringify(messageObj.components) === '[]' && messageObj.content == undefined) return;

            data.channel.send(messageObj)
        })

        defaults.forEach(async (commandData, commandName) => {

            let data = {};
            let prefixData = {}
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                    prefixData[key] = element;
                }
            }
                
            if (!commandData.executeOnDM && message.channel.type === 'DM') return;

            // parsing prefix
            let prefixes = []
            let parsedPrefixes = []

            if (Array.isArray(data.options.prefix)) {
                prefixes.push(...data.options.prefix)
            } else {
                prefixes.push(data.options.prefix)
            }

            for (const prefix of prefixes) {
                
                prefixData.message = message
                prefixData.channel = message.channel
                prefixData.guild = message.guild
                prefixData.author = message.author
                prefixData.command = {
                    enableComments: false
                }
                prefixData.eventType = 'default'
                prefixData.error = false
                prefixData.data = prefixData.getData()
                
                let parsePrefix = await prefixData.reader.default(prefixData, prefix)
                if (parsePrefix.error) return console.log('There are something wrong with your prefix...');

                parsedPrefixes.push(parsePrefix.result)
            }

            // checking prefix
            let triggeredPrefix = parsedPrefixes.find(prefix => message.content?.toLowerCase?.()?.startsWith?.(prefix.toLowerCase()))
            if (!triggeredPrefix) return;

            let contentData = {
                name: message.content?.replace?.(triggeredPrefix, '').trim().split(" ")[0],
                args: message.content?.replace?.(triggeredPrefix, '').trim().split(" ").slice(1)
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

            if (readerData?.error) return

            let messageObj = {
                reply: {
                    messageReference: readerData.data.messageToReply,
                    failIfNotExists: false
                },
                content: readerData.result.unescape(),
                components: readerData.data.components,
                embeds: readerData.data.embeds
            }

            if (messageObj.content.replaceAll('\n', '').trim() === '') delete messageObj.content;

            if (JSON.stringify(messageObj.embeds) === '[]' && JSON.stringify(messageObj.components) === '[]' && messageObj.content == undefined) return;
  
            data.channel.send(messageObj)
        })
    });
};