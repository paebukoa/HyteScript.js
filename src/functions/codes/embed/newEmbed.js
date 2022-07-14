let { MessageEmbed } = require('discord.js')

module.exports = {
    parseParams: false,
    run: async (d, code) => {
        if (code === undefined) return d.throwError.required(d, 'code')

        let newEmbed = new MessageEmbed();
        d.data.message.embeds.push(newEmbed);
        d.data.embedIndex = d.data.message.embeds.length - 1
        
        let parsedCode = await code.parse(d)
        if (parsedCode.error) return;
    }
}