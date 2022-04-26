module.exports = async d => {
    d.client.on('interactionCreate', async interaction => {

        d.commandManager.interaction.forEach(async commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.slashOptions = interaction.options
            data.value = interaction.values
            data.target = {
                message: interaction.targetMessage?.id,
                user: interaction.targetId
            }
            data.customId = interaction.customId ?? interaction.commandName
            data.command = commandData
            data.eventType = 'interaction'
            data.error = false
            data.data = data.getData()

            data.reader.default(data, commandData.code)
            
        })

        if (interaction.isCommand()) {
            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            const commandData = d.commandManager.commandInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.slashOptions = interaction.options
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'commandInteraction'
            data.error = false
            data.data = data.getData()

            
            data.reader.default(data, commandData.code)

        } else if (interaction.isButton()) {
            
            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            const commandData = d.commandManager.buttonInteraction.get(interaction.customId.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.customId = interaction.customId
            data.command = commandData
            data.eventType = 'buttonInteraction'
            data.error = false
            data.data = data.getData()

            data.reader.default(data, commandData.code)

        } else if (interaction.isSelectMenu()) {

            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            const commandData = d.commandManager.selectMenuInteraction.get(interaction.customId.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.value = interaction.values
            data.customId = interaction.customId
            data.command = commandData
            data.eventType = 'selectMenuInteraction'
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        } else if (interaction.isMessageContextMenu()) {
           
            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            const commandData = d.commandManager.messageContextMenuInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.target = {
                message: interaction.targetMessage.id,
                user: interaction.targetId
            }
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'messageContextMenuInteraction'
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        } else if (interaction.isUserContextMenu()) {
           
            let data = {};
        
            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            const commandData = d.commandManager.userContextMenuInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.target = {
                user: interaction.targetId
            }
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'userContextMenuInteraction'
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        } 
    })
}