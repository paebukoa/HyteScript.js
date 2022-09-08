const { clone, HscLog } = require("../utils/utils");

module.exports = async d => {
    if (!d.clientOptions.intents.includes('Guilds')) new d.error('requiredIntent', __filename, 'GuildEmojisAndStickers')
    
    d.client.on('emojiCreate', async emoji => {
        console.log('emoji criado')
        console.log(emoji)
        d.commandManager.emojiCreate.forEach(async commandData => {
            let data = clone(d)

            data.emoji = emoji
            data.guild = emoji.guild
            data.author = emoji.author
            data.command = commandData
            data.eventType = 'emojiCreate'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}