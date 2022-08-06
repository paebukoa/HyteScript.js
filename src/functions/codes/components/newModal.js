const { MessageActionRow, Modal, TextInputComponent } = require('discord.js')

module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'true',
            defaultValue: ''
        }
    ],
    dontParse: [2],
    run: async (d, title, customId, components) => {
        if (!d.interaction) return d.throwError.notAllowed(d, 'interaction type')

        if (title == undefined) return d.throwError.required(d, 'title')
        if (customId == undefined) return d.throwError.required(d, 'customId')
        if (components == undefined) return d.throwError.required(d, 'components')

        const modal = new Modal()
        .setTitle(title)
        .setCustomId(customId)

        let componentsData = d.utils.duplicate(d)
        componentsData.functions.set('newactionrow', {
            parseParams: false,
            run: async (d, code) => {
                if (code == undefined) return d.throwError.required(d, 'code')

                const actionRow = new MessageActionRow()

                const codeData = d.utils.duplicate(d)
                codeData.functions.set('addtextinput', {
                    parseParams: false,
                    run: async (d, options) => {
                        if (options == undefined) return d.throwError.required(d, 'options')

                        let textInput = new TextInputComponent()

                        let optionsData = d.utils.duplicate(d)
                        optionsData.functions.set('setlabel', {
                            parseParams: true,
                            run: async ({}, label) => {
                                textInput.setLabel(label)
                            }
                        })
                        optionsData.functions.set('setcustomid', {
                            parseParams: true,
                            run: async ({}, customId) => {
                                textInput.setCustomId(customId)
                            }
                        })
                        optionsData.functions.set('setplaceholder', {
                            parseParams: true,
                            run: async ({}, placeholder) => {
                                textInput.setPlaceholder(placeholder)
                            }
                        })
                        optionsData.functions.set('setstyle', {
                            parseParams: true,
                            run: async (d, style) => {
                                if (!['SHORT', 'PARAGRAPH'].includes(style?.toUpperCase?.())) return d.throwError.invalid(d, 'text input style', style)

                                textInput.setStyle(style.toUpperCase())
                            }
                        })
                        optionsData.functions.set('setvalue', {
                            parseParams: true,
                            run: async ({}, value) => {
                                textInput.setValue(value)
                            }
                        })
                        optionsData.functions.set('setrequired', {
                            parseParams: true,
                            run: async ({}, required) => {
                                textInput.setRequired(required === 'true')
                            }
                        })
                        optionsData.functions.set('setlength', {
                            parseParams: true,
                            run: async (d, min, max) => {
                                if (isNaN(min) || Number(min) < 0) return d.throwError.invalid(d, 'min number', min)
                                if (max != undefined && (isNaN(max) || Number(max) < Number(min))) return d.throwError.invalid(d, 'max number', max)

                                textInput.setMinLength(Number(min))
                                if (max != undefined) textInput.setMaxLength(Number(max))
                            }
                        })

                        await options.parse(optionsData, true)
                        d.error = optionsData.error
                        if (d.error) return;

                        if (textInput.label == undefined) return d.throwError.required(d, 'text input label')
                        if (textInput.customId == undefined) return d.throwError.required(d, 'text input custom ID')
                        if (textInput.style == undefined) return d.throwError.required(d, 'text input style')

                        actionRow.addComponents(textInput)
                    }
                })

                await code.parse(codeData, true)
                d.error = codeData.error
                if (d.error) return;

                modal.addComponents(actionRow)
            }
        })

        await components.parse(componentsData, true)
        d.error = componentsData.error
        if (d.error) return;

        d.interaction.showModal(modal)
    }
};