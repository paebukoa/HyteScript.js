let { EmbedBuilder, resolveColor } = require('discord.js');
const { clone, Functions } = require('../../utils/utils');

module.exports = {
    dontParse: [0],
    run: async (d, code) => {
        if (code === undefined) return new d.error("required", d, 'code')

        let embed = new EmbedBuilder();
        
        const codeData = clone(d)
        codeData.functions = new Functions(codeData.functions)
            .set('settitle', {
                async run(d, text) {
                    if (text == undefined) return new d.error("required", d, 'text')
                
                    embed.setTitle(text)
                }
            })
            .set('setauthor', {
                async run(d, name, iconURL) {
                    if (name == undefined) return new d.error("required", d, 'name')
                
                    embed.setAuthor({ name, iconURL });
                }
            })
            .set('setdescription', {
                async run(d, text) {
                    if (text == undefined) return new d.error("required", d, 'text')
                
                    embed.setDescription(text)
                }
            })
            .set('setfooter', {
                async run(d, text, iconURL) {
                    if (text == undefined) return new d.error("required", d, 'text')
                
                    embed.setFooter({ text, iconURL })
                }
            })
            .set('setimage', {
                async run(d, url) {
                    if (url == undefined) return new d.error("required", d, 'url')
                
                    embed.setImage(url)
                }
            })
            .set('setcolor', {
                async run(d, hex) {
                    if (hex == undefined) return new d.error("required", d, 'hex')

                    let resolved;

                    try {
                        resolved = resolveColor(hex)
                    } catch (e) {
                        return new d.error('invalid', d, 'hex color or color name', hex)
                    }
                
                    embed.setColor(resolved)
                }
            })
            .set('setthumbnail', {
                async run(d, url) {
                    if (url == undefined) return new d.error("required", d, 'url')
                
                    embed.setThumbnail(url)
                }
            })
            .set('addfield', {
                async run(d, name, value, inline = 'false') {
                    if (name == undefined) return new d.error("required", d, 'name')
                    if (value == undefined) return new d.error("required", d, 'value')
                
                    embed.addFields({name, value, inline: inline === 'true'})
                }
            })
            .set('seturl', {
                async run(d, url) {
                    if (url == undefined) return new d.error("required", d, 'url')
                
                    embed.setURL(url)
                }
            })
            .set('settimestamp', {
                async run(d, ms = Date.now()) {
                    if (ms == undefined) return new d.error("required", d, 'miliseconds')

                    if (isNaN(ms)) return new d.error("invalid", d, 'timestamp', ms);
                
                    embed.setTimestamp(Number(ms))
                }
            })

        await code.parse(codeData)
        d.err = codeData.err
        if (d.err) return;
        d.data = codeData.data

        d.data.message.embeds.push(embed)
    }
}