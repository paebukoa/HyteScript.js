module.exports = {
    description: 'Gets an interaction info.',
    usage: 'type | parameters...',
    parameters: [
        {
            name: 'Type',
            description: 'The interaction info type.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Parameters',
            description: 'The parameters that can be provided depending on type.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, type, ...parameters) => {
        if (type == undefined) return d.throwError.required(d, 'type')

        let types = {
            slashOption(name) {
                if (!['interaction', 'commandInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction or commandInteraction types')

                if (name == undefined) return d.throwError.required(d, 'name')
                
                return d.slashOptions?.get?.(name)?.value
            },
            selected(index = 'all') {
                if (!['interaction', 'selectMenuInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction or selectMenuInteraction types')

                if ((isNaN(index) || Number(index) < 1) && index.toLowerCase() !== 'all') return d.throwError.invalid(d, 'index', index);

                if (typeof d.value === 'string') return d.value
                else if (index.toLowerCase() === 'all') return d.value?.map?.(x => d.utils.escape(x))?.join?.(',')
                else return d.value?.[Number(index) - 1]
            },
            targetted(type) {
                if (!['interaction', 'userContextMenuInteraction', 'messageContextMenuInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction, userContextMenuInteraction or messageContextMenuInteraction types')

                if (type == undefined) return d.throwError.required(d, 'type')

                let types = {
                    message: d.target?.message,
                    user: d.target?.user
                }

                if (!types[type.toLowerCase()]) return d.throwError.invalid(d, 'type', type)

                return types[type.toLowerCase()]
            },
            customId() {
                if (!['interaction', 'buttonInteraction', 'selectMenuInteraction', 'modalSubmitInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction, buttonInteraction, selectMenuInteraction or modalSubmitInteraction types')

                return d.customId
            },
            modalComponent(type, customId) {
                if (!['interaction', 'modalSubmitInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction or modalSubmitInteraction types')

                if (type == undefined) return d.throwError.required(d, 'type')

                let types = {
                    textinput() {
                        return d.fields.getTextInputValue(customId)
                    }
                }

                let runType = types[type.toLowerCase()]
                if (!runType) return d.throwError.invalid(d, 'type', type)
                return runType()
            },
            focused(property) {
                if (!['interaction', 'autocompleteInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction or autocompleteInteraction types')

                if (property == undefined) return d.throwError.required(d, 'property')
                
                let focused = interaction.options.getFocused(true)

                let prop = focused[property.toLowerCase()]
                if (!prop) return d.throwError.invalid(d, 'property', property)
                return prop
            }
        }

        let runFunction = types[type]
        if (!runFunction) return d.throwError.invalid(d, 'type', type)
        return runFunction(...parameters)
    }
}