module.exports = async d => {
    d.client.on('interactionCreate', async interaction => {
        let data = {};
        
        for (const key in d) {
            if (Object.hasOwnProperty.call(d, key)) {
                const element = d[key];
                
                data[key] = element;
            }
        }

        const commandData = data.commandManager.interaction.get(interaction.commandName.toLowerCase())
        if (!commandData) return

        data.interaction = interaction
        data.channel = interaction.channel
        data.guild = interaction.guild
        data.author = interaction.user
        data.slashOptions = interaction.options
        data.command = commandData
        data.eventType = 'interaction'
        data.error = false;
        data.data = {
            vars: new Map(),
            arrays: {
                default: []
            },
            objects: {
                default: new Map()
            },
            embeds: [],
            errorData: {},
            callbacks: data.commandManager.callback
        }

        const readerData = await data.reader.default(data, commandData.code)
    })
}