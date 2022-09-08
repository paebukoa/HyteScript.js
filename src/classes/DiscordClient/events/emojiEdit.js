const { clone } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildEmojiAndStickers']

    if (!d.clientOptions.intents.some(intent => requiredIntents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename, '.js', ''), ...requiredIntents)

    d.client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
        d.commandManager.channelEdit.forEach(async commandData => {
            let data = clone(d)

            data.emoji = newEmoji
            data.guild = newEmoji.guild
            data.command = commandData
            data.newType = 'emoji'
            data.old = oldEmoji
            data.new = newEmoji
            data.eventType = 'emojiEdit'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}