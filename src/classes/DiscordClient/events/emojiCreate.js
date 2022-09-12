const { clone, HscLog, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildEmojiAndStickers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename, '.js', ''), ...requiredIntents)
    
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