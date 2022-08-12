let { EmbedBuilder } = require('discord.js')

module.exports = {
    dontParse: [0],
    run: async (d, code) => {
        if (code === undefined) return new d.error("required", d, 'code')

        let newEmbed = new EmbedBuilder();
        d.data.message.embeds.push(newEmbed);
        d.data.embedIndex = d.data.message.embeds.length - 1
        
        await code.parse(d)
    }
}