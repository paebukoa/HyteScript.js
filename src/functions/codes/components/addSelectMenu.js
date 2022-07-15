module.exports = {
    parseParams: false,
    run: async (d, placeholder, customId, options, min = '1', max = '1', disabled = 'false') => {
        if (d.function.parent.toLowerCase() !== 'newactionrow') return d.throwError.notAllowed(d, `#(newActionRow)`)

        if (placeholder == undefined) return d.throwError.required(d, 'placeholder')
        if (customId == undefined) return d.throwError.required(d, 'custom ID')
        if (options == undefined) return d.throwError.required(d, 'options')

        if (typeof placeholder === 'object') {
            let parsedPlaceholder = await placeholder.parse(d)
            if (parsedPlaceholder.error) return;
            placeholder = parsedPlaceholder.result
        }

        if (typeof customId === 'object') {
            let parsedCustomId = await customId.parse(d)
            if (parsedCustomId.error) return;
            customId = parsedCustomId.result
        }

        if (typeof min === 'object') {
            let parsedmin = await min.parse(d)
            if (parsedmin.error) return;
            min = parsedmin.result
        }

        if (typeof max === 'object') {
            let parsedmax = await max.parse(d)
            if (parsedmax.error) return;
            max = parsedmax.result
        }

        if (typeof disabled === 'object') {
            let parseddisabled = await disabled.parse(d)
            if (parseddisabled.error) return;
            disabled = parseddisabled.result
        }

        if (isNaN(min) || Number(min) < 1) return d.throwError.invalid(d, 'min values', min);
        if (isNaN(max) || Number(max) < Number(min)) return d.throwError.invalid(d, 'max values', max);

        let optionsData = d.utils.duplicate(d)
        optionsData.functions.set('addoption', {
            parseParams: true,
            run: async (d, label, description, value, defaultOption = 'false', emoji) => {
                if (label == undefined) return d.throwError.required(d, 'label')
                if (description == undefined) return d.throwError.required(d, 'description')
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

        let wrongFunction = options.functions.find(x => x.name.toLowerCase() !== 'addoption')
        if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in select menu options.`)

        let parsedOptions = await options.parse(optionsData, true)
        if (parsedOptions.error) return;

        if (parsedOptions.result[0] == undefined) return d.throwError.func(d, 'at least one option must be provided')

        d.data.message.components[d.data.componentIndex] = d.data.message.components[d.data.componentIndex]
        .addComponents({
            type: 'SELECT_MENU',
            minValues: Number(min),
            maxValues: Number(max),
            customId,
            disabled: disabled === "true",
            options: parsedOptions.result
        })
    }
}