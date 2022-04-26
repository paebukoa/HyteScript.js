module.exports = async d => {
    let [placeholder, customId, minValues = '1', maxValues = '1', disabled = 'false', index = d.data.components.length, ...optionsArr] = d.func.params.splits;

    if (customId == undefined) return d.throwError.func(d, 'custom ID field is required')

    if (isNaN(minValues) || Number(minValues) < 1) return d.throwError.invalid(d, 'index', index);
    if (isNaN(maxValues) || Number(maxValues) < Number(minValues)) return d.throwError.invalid(d, 'index', index);

    let selectOptions = [];

    for (const options of optionsArr) {
        let args = options.split(",")
        args = args
        .map(x => x.startsWith(" ") && ![" ", "  "].includes(x) ? x.slice(1) : x)
        .map(x => x.endsWith(" ") && ![" ", "  "].includes(x) ? x.slice(0, x.length - 1) : x)

        let [label, description, value, defaultOption = 'false', emoji] = args

        if (label == undefined) return d.throwError.func(d, 'option label field is required')
        if (value == undefined) return d.throwError.func(d, 'option value field is required')

        selectOptions.push({
            label,
            description,
            value,
            default: defaultOption === 'true',
            emoji
        })
    }  
    if (index?.trim?.() === '') index = d.data.components.length

    if (isNaN(index) || Number(index) < 1 || Number(index) > d.data.components.length) return d.throwError.invalid(d, 'action row index', index)

    d.data.components[Number(index) - 1] = d.data.components[Number(index) - 1]
    .addComponents({
        type: 'SELECT_MENU',
        placeholder,
        minValues: Number(minValues),
        maxValues: Number(maxValues),
        customId,
        disabled: disabled === "true",
        options: selectOptions
    })
};