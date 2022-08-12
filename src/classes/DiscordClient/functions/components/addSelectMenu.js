const { SelectMenuBuilder, SelectMenuOptionBuilder } = require('discord.js')
const { cloneObject, Functions } = require('../../utils/utils')

module.exports = {
    dontParse: [2],
    run: async (d, placeholder, customId, options, min = '1', max, disabled = 'false') => {
        if (d.function.parent.toLowerCase() !== 'newactionrow') return new d.error("notAllowed", d, `#(newActionRow)`)

        if (placeholder == undefined) return new d.error("required", d, 'placeholder')
        if (customId == undefined) return new d.error("required", d, 'custom ID')
        if (options == undefined) return new d.error("required", d, 'options')

        if (isNaN(min) || Number(min) < 1) return new d.error("invalid", d, 'min values', min);
        if ((isNaN(max) || Number(max) < Number(min)) && max != undefined) return new d.error("invalid", d, 'max values', max);

        let selectMenu = new SelectMenuBuilder()
        .setPlaceholder(placeholder)
        .setCustomId(customId)
        .setMinValues(Number(min))
        .setDisabled(disabled === 'true')

        if (max != undefined) selectMenu.setMaxValues(Number(max))

        let optionsData = cloneObject(d)
        optionsData.functions = new Functions(optionsData.functions).set('addoption', { 
            run: async (d, label, description, value, defaultOption = 'false', emoji) => {
                if (label == undefined) return new d.error("required", d, 'label')
                if (value == undefined) return new d.error("required", d, 'value')

                let selectMenuOption = new SelectMenuOptionBuilder()
                .setLabel(label)
                .setValue(value)
                .setDefault(defaultOption === 'true')

                if (description != undefined) selectMenuOption.setDescription(description)
                if (emoji != undefined) selectMenuOption.setEmoji(emoji)

                selectMenu.addOptions(selectMenuOption)
            }
        })

        await options.parse(optionsData, true)
        d.err = optionsData.err
        if (d.err) return;

        d.data.message.components[d.data.componentIndex].addComponents(selectMenu)
    }
}