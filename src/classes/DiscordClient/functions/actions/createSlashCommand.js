const { clone, Functions, unescape } = require("../../utils/utils")
const { 
    SlashCommandBuilder, 
    SlashCommandStringOption, 
    SlashCommandNumberOption, 
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandUserOption,
    SlashCommandRoleOption,
    SlashCommandMentionableOption,
    SlashCommandSubcommandBuilder
} = require('discord.js')

module.exports = {
    description: 'Creates or update a slash command.',
    usage: 'name | description? | options? | returnId?',
    parameters: [
        {
            name: 'Name',
            description: 'The slash command name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Description',
            description: 'The slash command description.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Options',
            description: 'The slash command options. Read #(createSlashCommand) in HyteScript wikis for detailed explanation.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Return ID',
            description: 'Whether to return the slash command ID or not.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    dontParse: [2],
    run: async (d, name, description, options, returnId = 'false') => {
        if (name == undefined) return new d.error("required", d, 'name')

        let slashCommand = new SlashCommandBuilder()
        .setName(name)

        if (description != undefined) slashCommand.setDescription(description)

        if (typeof options === 'object') {
            let optionsData = clone(d)

            function setOptionFunctions(optionsData, slashCommand) {
                optionsData.functions = new Functions(optionsData.functions).set('addstringoption', { 
                    dontParse: [2],
                    run: async (d, name, description, choices, minLength, maxLength, required = 'false', autocomplete = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        if (minLength != undefined && isNaN(minLength)) return new d.error("invalid", d, 'min length number', minLength)
                        if (maxLength != undefined && (isNaN(maxLength) || Number(maxLength) < Number(minLength))) return new d.error("invalid", d, 'max length number', maxLength)

                        let slashCommandOption = new SlashCommandStringOption()
                        .setName(name)
                        .setRequired(required === 'true')
                        .setAutocomplete(autocomplete === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)
                        if (minLength != undefined) slashCommandOption.setMinLength(Number(minLength))
                        if (maxLength != undefined) slashCommandOption.setMaxLength(Number(maxLength))

                        if (choices !== undefined) {
                            let choicesData = clone(optionsData)
            
                            choicesData.functions = new Functions(choicesData.functions).set('addchoice', { 
                                run: async (d, name, value) => {
                                    if (name == undefined) return new d.error("required", d, 'name')
                                    if (value == undefined) return new d.error("required", d, 'value')

                                    slashCommandOption.addChoices({name, value})
                                }
                            })

                            await choices.parse(choicesData, true)
                            d.err = choicesData.err
                            if (d.err) return;
                        }

                        slashCommand.addStringOption(slashCommandOption)
                    }
                }).set('addnumberoption', { 
                    run: async (d, name, description, minValue, maxValue, required = 'false', autocomplete = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        if (minValue != undefined && isNaN(minValue)) return new d.error("invalid", d, 'min number', minValue)
                        if (maxValue != undefined && (isNaN(maxValue) || Number(maxValue) < Number(minValue))) return new d.error("invalid", d, 'max number', maxValue)

                        let slashCommandOption = new SlashCommandNumberOption()
                        .setName(name)
                        .setRequired(required === 'true')
                        .setAutocomplete(autocomplete === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)
                        if (minValue != undefined) slashCommandOption.setMinValue(Number(minValue))
                        if (maxValue != undefined) slashCommandOption.setMaxValue(Number(maxValue))

                        slashCommand.addNumberOption(slashCommandOption)
                    }
                }).set('addbooleanoption', { 
                    run: async (d, name, description, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandBooleanOption()
                        .setName(name)
                        .setRequired(required === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)

                        slashCommand.addBooleanOption(slashCommandOption)
                    }
                }).set('adduseroption', { 
                    run: async (d, name, description, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandUserOption()
                        .setName(name)
                        .setRequired(required === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)

                        slashCommand.addUserOption(slashCommandOption)
                    }
                }).set('addchanneloption', {
                    dontUnescape: [2],
                    run: async (d, name, description, channelTypes, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandChannelOption()
                        .setName(name)
                        .setRequired(required === 'true')
                        
                        if (description != undefined) slashCommandOption.setDescription(description)
                        
                        if (channelTypes != undefined) {
                            let chTypes = []

                            let types = {
                                text: 'GUILD_TEXT',
                                voice: 'GUILD_VOICE',
                                news: 'GUILD_NEWS',
                                newsthread: 'GUILD_NEWS_THREAD',
                                publicthread: 'GUILD_PUBLIC_THREAD',
                                privatethread: 'GUILD_PRIVATE_THREAD',
                                stage: 'GUILD_STAGE_VOICE'
                            }

                            channelTypes = channelTypes.split(',').map(x => unescape(x))

                            for (let channelType of channelTypes) {
                                let type = types[channelType.toLowerCase()]
                                if (!type) return new d.error("invalid", d, 'type', channelType)

                                chTypes.push(type)
                            }

                            slashCommandOption.addChannelTypes(...chTypes)
                        }

                        slashCommand.addChannelOption(slashCommandOption)
                    }
                }).set('addroleoption', { 
                    run: async (d, name, description, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandRoleOption()
                        .setName(name)
                        .setRequired(required === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)

                        slashCommand.addRoleOption(slashCommandOption)
                    }
                }).set('addmentionableoption', { 
                    run: async (d, name, description, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandMentionableOption()
                        .setName(name)
                        .setRequired(required === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)

                        slashCommand.addMentionableOption(slashCommandOption)                
                    }
                }).set('addattachmentoption', { 
                    run: async (d, name, description, required = 'false') => {
                        if (name == undefined) return new d.error("required", d, 'name')

                        let slashCommandOption = new SlashCommandUserOption()
                        .setName(name)
                        .setRequired(required === 'true')

                        if (description != undefined) slashCommandOption.setDescription(description)

                        slashCommand.addUserOption(slashCommandOption)
                    }
                })
            }
            
            setOptionFunctions(optionsData, slashCommand)

            optionsData.functions.set('addsubcommand', {
                dontParse: [2],
                run: async (d, name, description, options) => {
                    if (name == undefined) return new d.error("required", d, 'name')
                    if (options == undefined) return new d.error("required", d, 'options')

                    let slashSubCommand = new SlashCommandSubcommandBuilder()
                    .setName(name)

                    if (description != undefined) slashSubCommand.setDescription(description)

                    let optionsData = clone(d)

                    setOptionFunctions(optionsData, slashSubCommand)

                    await options.parse(optionsData, true)
                    d.err = optionsData.err
                    if (d.err) return;

                    slashCommand.addSubcommand(slashSubCommand)
                }
            })


            await options.parse(optionsData, true)
            d.err = optionsData.err
            if (d.err) return;
        }

        let newCommand = await d.client.application.commands.create(slashCommand).catch(e => new d.error("custom", d, e.message))

        return returnId === 'true' ? newCommand?.id : undefined
    }
}