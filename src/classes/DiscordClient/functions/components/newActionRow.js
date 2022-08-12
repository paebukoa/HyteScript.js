const { ActionRowBuilder } = require('discord.js')

module.exports = {
    dontParse: [0],
    run: async (d, code) => {
        if (code == undefined) return new d.error("required", d, 'code')

        let newActionRow = new ActionRowBuilder()
        d.data.message.components.push(newActionRow)
        d.data.componentIndex = d.data.message.components.length - 1

        await code.parse(d)
    }
}