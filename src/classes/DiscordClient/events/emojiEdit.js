const { clone } = require("../utils/utils");

module.exports = async d => {
    if (!d.clientOptions.intents.includes('Guilds')) new d.error('requiredIntent', __filename, 'GuildEmojisAndStickers')

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