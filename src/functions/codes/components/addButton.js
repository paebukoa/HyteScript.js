module.exports = async d => {
    let [type, label, ...rest] = d.func.params.splits

    if (type == undefined) return d.throwError.func(d, 'type field is required')
    if (label == undefined) return d.throwError.func(d, 'label field is required')

    let types = ['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER', 'LINK']

    if ((isNaN(type) || Number(type) < 1 || Number(type) > 5) && !types.includes(type.toUpperCase())) return d.throwError.invalid(d, 'style type', type)

    if (type.toUpperCase() == 'LINK') {

        let [customId, url, disabled = 'false', emoji, index = d.data.components.length] = rest

        if (customId == undefined) return d.throwError.func(d, 'custom ID field is required')

        if (isNaN(index) || Number(index) < 1 || Number(index) > d.data.components.length) return d.throwError.invalid(d, 'action row index', index)

        d.data.components[Number(index) - 1] = d.data.components[Number(index) - 1]
        .addComponents({
            type: 'BUTTON',
            label,
            style: type.toUpperCase(),
            customId,
            url,
            disabled: disabled === 'true',
            emoji
        })

    } else {

        let [customId, disabled = 'false', emoji, index = d.data.components.length] = rest

        if (customId == undefined) return d.throwError.func(d, 'custom ID field is required')

        if (isNaN(index) || Number(index) < 1 || Number(index) > d.data.components.length) return d.throwError.invalid(d, 'action row index', index)
        
        d.data.components[Number(index) - 1] = d.data.components[Number(index) - 1]
        .addComponents({
            type: 'BUTTON',
            label: label?.unescape?.(),
            style: type.toUpperCase(),
            customId: customId?.unescape?.(),
            disabled: disabled === 'true',
            emoji: emoji?.unescape?.()
        })

    }
};