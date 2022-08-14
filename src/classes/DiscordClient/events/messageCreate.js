const { cloneObject, Data } = require("../utils/utils");

module.exports = async d => {
    d.client.on("messageCreate", async message => {
        if (message.author.bot && d.clientOptions.respondBots != true) return;
        
        let ignoringPrefix = new Map()
        let defaults = new Map()

        d.commandManager.default.forEach((commandData, commandName) => {
            if (commandData.ignorePrefix === true) ignoringPrefix.set(commandName, commandData)
            else defaults.set(commandName, commandData)
        })

        d.commandManager.alwaysExecute.forEach(async commandData => {

            let data = cloneObject(d)

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
            data.err = false
            data.data = d.data.newInstance()

            const parseCode = await data.command.code.parse(data)
            if (parseCode.error) return;

            if (JSON.stringify(parseCode.message.embeds) === '[]' && JSON.stringify(parseCode.message.components) === '[]' && parseCode.message.content == undefined) return;
  
            data.channel.send(parseCode.message)

        })

        ignoringPrefix.forEach(async (commandData, commandName) => {

            let data = cloneObject(d)
                
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
            data.err = false
            data.data = d.data.newInstance()

            const parseCode = await data.command.code.parse(data)
            if (parseCode.error) return;

            if (JSON.stringify(parseCode.message.embeds) === '[]' && JSON.stringify(parseCode.message.components) === '[]' && parseCode.message.content == undefined) return;
  
            data.channel.send(parseCode.message)
        })

        let prefixes = []
        let parsedPrefixes = []

        if (JSON.stringify(defaults) != '[]') {
            let prefixData = cloneObject(d)
            
            // parsing prefix
            
            if (Array.isArray(d.clientOptions.prefix)) {
                prefixes.push(...d.clientOptions.prefix)
            } else {
                prefixes.push(d.clientOptions.prefix)
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
                prefixData.err = false
                prefixData.data = d.data.newInstance()
                
                let parsePrefix = await prefix.parse(prefixData)
                if (parsePrefix.error) return;

				parsedPrefixes.push(parsePrefix.result)
            }
        }

        defaults.forEach(async (commandData, commandName) => {

            let data = cloneObject(d)
                
            if (!commandData.executeOnDM && message.channel.type === 'DM') return;
            // checking prefix
            let triggeredPrefix = parsedPrefixes.find(prefix => message.content?.toLowerCase?.()?.startsWith?.(prefix.toLowerCase()))
            if (!triggeredPrefix) return;

            let contentData = {
                name: message.content?.replace?.(triggeredPrefix, '').trim().split(" ")[0],
                args: message.content?.replace?.(triggeredPrefix, '').trim().split(" ").slice(1)
            }

            if (commandName !== contentData.name.toLowerCase() && !commandData.aliases.includes(contentData.name.toLowerCase())) return;

            data.message = message
            data.channel = message.channel
            data.guild = message.guild
            data.author = message.author
            data.command = commandData
            data.eventType = 'default'
            data.args = contentData.args
            data.err = false
            data.data = d.data.newInstance()

            const parseCode = await data.command.code.parse(data)
            if (parseCode.error) return;

            if (JSON.stringify(parseCode.message.embeds) === '[]' && JSON.stringify(parseCode.message.components) === '[]' && parseCode.message.content == undefined) return;
  
            data.channel.send(parseCode.message)
        })
    });
};