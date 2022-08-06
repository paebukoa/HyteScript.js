const { MessageSelectMenu } = require('discord.js')

module.exports = {
    dontParseParams: [2],
    run: async (d, placeholder, customId, options, min = '1', max, disabled = 'false') => {
        if (d.function.parent.toLowerCase() !== 'newactionrow') return d.throwError.notAllowed(d, `#(newActionRow)`)

        if (placeholder == undefined) return d.throwError.required(d, 'placeholder')
        if (customId == undefined) return d.throwError.required(d, 'custom ID')
        if (options == undefined) return d.throwError.required(d, 'options')

        if (isNaN(min) || Number(min) < 1) return d.throwError.invalid(d, 'min values', min);
        if ((isNaN(max) || Number(max) < Number(min)) && max != undefined) return d.throwError.invalid(d, 'max values', max);

        const selectMenu = new MessageSelectMenu()

        let optionsData = d.utils.duplicate(d)
        optionsData.functions.set('addoption', {
            parseParams: true,
            run: async (d, label, value, description, defaultOption = 'false', emoji) => {
                if (label == undefined) return d.throwError.required(d, 'label')
                if (value == undefined) return d.throwError.required(d, 'value')

                return {
                    label,
                    description,
                    value,
                    default: defaultOption === 'true',
                    emoji
                }
            }
        })

        let parsedOptions = await options.parse(optionsData, true)
        d.error = optionsData.error
        if (parsedOptions.error) return;

        if (parsedOptions.result[0] == undefined) return d.throwError.func(d, 'at least one option must be provided')

        d.data.message.components[d.data.componentIndex] = d.data.message.components[d.data.componentIndex]
        .addComponents({
            type: 'SELECT_MENU',
            minValues: Number(min),
            maxValues: max != undefined ? Number(max) : max,
            customId,
            placeholder,
            disabled: disabled === "true",
            options: parsedOptions.result
        })
    }
}