const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildEmojisAndStickers']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('emojiDelete', async emoji => {
        d.commandManager.emojiDelete.forEach(async commandData => {
            let data = clone(d)

            data.emoji = emoji
            data.guild = emoji.guild
            data.author = emoji.author
            data.command = commandData
            data.eventType = 'emojiDelete'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}