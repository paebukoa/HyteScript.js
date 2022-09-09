const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { clone, Functions } = require('../../utils/utils');

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
        if (!d.interaction) return new d.error("notAllowed", d, 'interaction type')

        if (title == undefined) return new d.error("required", d, 'title')
        if (customId == undefined) return new d.error("required", d, 'customId')
        if (components == undefined) return new d.error("required", d, 'components')

        const modal = new ModalBuilder()
        .setTitle(title)
        .setCustomId(customId)

        let componentsData = clone(d)
        componentsData.functions = new Functions(componentsData.functions).set('newactionrow', {
            dontParse: [0],
            run: async (d, code) => {
                if (code == undefined) return new d.error("required", d, 'code')

                const actionRow = new ActionRowBuilder()

                const codeData = clone(componentsData)
                codeData.functions = new Functions(codeData.functions).set('addtextinput', {
                    dontParse: [0],
                    run: async (d, options) => {
                        if (options == undefined) return new d.error("required", d, 'options')

                        let textInput = new TextInputBuilder()

                        let optionsData = clone(codeData)
                        optionsData.functions = new Functions(optionsData.functions).set('setlabel', { 
                            run: async ({}, label) => {
                                textInput.setLabel(label)
                            }
                        }).set('setcustomid', { 
                            run: async ({}, customId) => {
                                textInput.setCustomId(customId)
                            }
                        }).set('setplaceholder', { 
                            run: async ({}, placeholder) => {
                                textInput.setPlaceholder(placeholder)
                            }
                        }).set('setstyle', { 
                            run: async (d, style) => {
                                let styles = {
									short: TextInputStyle.Short,
									paragraph: TextInputStyle.Paragraph
								}
								
                                if (styles[style.toLowerCase()] == undefined) return new d.error("invalid", d, 'text input style', style)

                                textInput.setStyle(styles[style.toLowerCase()])
                            }
                        }).set('setvalue', { 
                            run: async ({}, value) => {
                                textInput.setValue(value)
                            }
                        }).set('setrequired', { 
                            run: async ({}, required) => {
                                textInput.setRequired(required === 'true')
                            }
                        }).set('setlength', { 
                            run: async (d, min, max) => {
                                if (isNaN(min) || Number(min) < 0) return new d.error("invalid", d, 'min number', min)
                                if (max != undefined && (isNaN(max) || Number(max) < Number(min))) return new d.error("invalid", d, 'max number', max)

                                textInput.setMinLength(Number(min))
                                if (max != undefined) textInput.setMaxLength(Number(max))
                            }
                        })

                        await options.parse(optionsData, true)
                        d.err = optionsData.err
                        if (d.err) return;
                        d.data = optionsData.data

						console.log(textInput)
                        actionRow.addComponents(textInput)
                    }
                })

                await code.parse(codeData, true)
                d.err = codeData.err
                if (d.err) return;
                d.data = codeData.data

                modal.addComponents(actionRow)
            }
        })

        await components.parse(componentsData, true)
        d.err = componentsData.err
        if (d.err) return;
        d.data = componentsData.data

        d.interaction.showModal(modal)
    }
};