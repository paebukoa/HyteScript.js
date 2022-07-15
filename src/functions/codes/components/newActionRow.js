const { MessageActionRow } = require('discord.js')

module.exports = {
    parseParams: false,
    run: async (d, code) => {
        if (code == undefined) return d.throwError.required(d, 'code')

        let newActionRow = new MessageActionRow()
        d.data.message.components.push(newActionRow)
        d.data.componentIndex = d.data.message.components.length - 1

        await code.parse(d)
    }
}