module.exports = {
    run: async (d, type, label, customId, disabled = 'false', emoji) => {
        if (d.function.parent.toLowerCase() !== 'newactionrow') return d.throwError.notAllowed(d, `#(newActionRow)`)

        if (type == undefined) return d.throwError.required(d, 'style type')
        if (label == undefined) return d.throwError.required(d, 'label')
        if (customId == undefined) return d.throwError.required(d, 'custom ID')

        let types = ['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER', 'LINK']

        if ((isNaN(type) || Number(type) < 1 || Number(type) > 5) && !types.includes(type.toUpperCase())) return d.throwError.invalid(d, 'style', type)

        let obj = {
            type: 'BUTTON',
            style: isNaN(type) ? type.toUpperCase() : Number(type),
            label,
            disabled: disabled === 'true',
            emoji
        }

        if (type.toUpperCase() === 'LINK') obj.url = customId
        else obj.customId = customId

        console.log(obj)

        d.data.message.components[d.data.componentIndex] = d.data.message.components[d.data.componentIndex].addComponents(obj)
    }
}