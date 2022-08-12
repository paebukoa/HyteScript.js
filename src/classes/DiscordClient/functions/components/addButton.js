const { ButtonStyle, ButtonBuilder } = require('discord.js')

module.exports = {
    run: async (d, style, label, customId, disabled = 'false', emoji) => {
        if (d.function.parent.toLowerCase() !== 'newactionrow') return new d.error("notAllowed", d, `#(newActionRow)`)

        if (style == undefined) return new d.error("required", d, 'style type')
        if (label == undefined) return new d.error("required", d, 'label')
        if (customId == undefined) return new d.error("required", d, 'custom ID')

        let styles = {
            PRIMARY: ButtonStyle.Primary,
            SECONDARY: ButtonStyle.Secondary,
            SUCCESS: ButtonStyle.Success,
            DANGER: ButtonStyle.Danger,
            LINK: ButtonStyle.Link
        }

        style = styles[style.toUpperCase()]

        if (style == undefined) return new d.error("invalid", d, 'style', style)

        let button = new ButtonBuilder()
        .setLabel(label)
        .setStyle(style)
        .setDisabled(disabled === 'true')
        .setEmoji(emoji)

        if (style === styles.LINK) button.setURL(customId)
        else button.setCustomId(customId)

        d.data.message.components[d.data.componentIndex].addComponents(button)
    }
}