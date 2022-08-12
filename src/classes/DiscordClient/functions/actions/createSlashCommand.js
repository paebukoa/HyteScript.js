const { cloneObject, Functions } = require("../../utils/utils")

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
        if (options == undefined) return new d.error("required", d, 'options')

        let obj = {
            name, 
            description,
            type: 'CHAT_INPUT',
            options: []
        }

        let optionsData = cloneObject(d)

        function setOptionFunctions(optionsData, obj) {
            optionsData.functions = new Functions(optionsData.functions).set('addstringoption', { 
                dontParse: [2],
                run: async (d, name, description, choices, minLength, maxLength, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    if (minLength != undefined && isNaN(minLength)) return new d.error("invalid", d, 'min length number', minLength)
                    if (maxLength != undefined && (isNaN(maxLength) || Number(maxLength) < Number(minLength))) return new d.error("invalid", d, 'max length number', maxLength)

                    let optionObj = {
                        type: 'STRING',
                        name,
                        description,
                        minLength: Number(minLength),
                        maxLength: Number(maxLength),
                        required: required === 'true',
                        autocomplete: autocomplete === 'true',
                        choices: []
                    }

                    if (choices !== undefined) {
                        let choicesData = cloneObject(optionsData)
        
                        choicesData.functions = new Functions(choicesData.functions).set('addchoice', { 
                            run: async (d, name, value) => {
                                if (name == undefined) return new d.error("required", d, 'name')
                                if (value == undefined) return new d.error("required", d, 'value')

                                optionObj.choices.push({name, value})
                            }
                        })

                        await choices.parse(choicesData, true)
                        d.err = choicesData.err
                        if (d.err) return;
                    }

                    obj.options.push(optionObj)
                }
            }).set('addnumberoption', { 
                run: async (d, name, description, min, max, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    if (min != undefined && isNaN(min)) return new d.error("invalid", d, 'min number', min)
                    if (max != undefined && (isNaN(max) || Number(max) < Number(min))) return new d.error("invalid", d, 'max number', max)

                    let optionObj = {
                        type: 'INTEGER',
                        name,
                        description,
                        minValue: Number(min),
                        maxValue: Number(max),
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    obj.options.push(optionObj)
                }
            }).set('addbooleanoption', { 
                run: async (d, name, description, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let optionObj = {
                        type: 'BOOLEAN',
                        name,
                        description,
                        required: required === 'true'
                    }

                    obj.options.push(optionObj)
                }
            }).set('adduseroption', { 
                run: async (d, name, description, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let optionObj = {
                        type: 'USER',
                        name,
                        description,
                        required: required === 'true'
                    }

                    obj.options.push(optionObj)
                }
            }).set('addchanneloption', { 
                run: async (d, name, description, channelTypes, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let chTypes = []

                    if (channelTypes != undefined) {
                        let types = {
                            text: 'GUILD_TEXT',
                            voice: 'GUILD_VOICE',
                            news: 'GUILD_NEWS',
                            newsthread: 'GUILD_NEWS_THREAD',
                            publicthread: 'GUILD_PUBLIC_THREAD',
                            privatethread: 'GUILD_PRIVATE_THREAD',
                            stage: 'GUILD_STAGE_VOICE'
                        }

                        channelTypes = channelTypes.split(',')

                        for (let channelType of channelTypes) {
                            let type = types[channelType.toLowerCase()]
                            if (!type) return new d.error("invalid", d, 'type', channelType)

                            chTypes.push(type)
                        }
                    }

                    let optionObj = {
                        type: 'CHANNEL',
                        name,
                        description,
                        required: required === 'true',
                        channelTypes: chTypes
                    }

                    obj.options.push(optionObj)
                }
            }).set('addroleoption', { 
                run: async (d, name, description, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let optionObj = {
                        type: 'ROLE',
                        name,
                        description,
                        required: required === 'true'
                    }

                    obj.options.push(optionObj)
                }
            }).set('addmentionableoption', { 
                run: async (d, name, description, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let optionObj = {
                        type: 'MENTIONABLE',
                        name,
                        description,
                        required: required === 'true'
                    }

                    obj.options.push(optionObj)                    
                }
            }).set('addattachmentoption', { 
                run: async (d, name, description, required = 'false') => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    let optionObj = {
                        type: 'ATTACHMENT',
                        name,
                        description,
                        required: required === 'true'
                    }

                    obj.options.push(optionObj)
                }
            })
        }

        optionsData.functions = new Functions(optionsData.functions).set('addsubcommand', {
            dontParse: [2],
            run: async (d, name, description, options) => {
                if (name == undefined) return new d.error("required", d, 'name')
                if (options == undefined) return new d.error("required", d, 'options')

                let optionObj = {
                    type: 'SUB_COMMAND',
                    name,
                    description
                }

                let optionsData = cloneObject(d)

                setOptionFunctions(optionsData, optionObj)

                await options.parse(optionsData, true)
                d.err = optionsData.err
                if (parsedOptions.error) return;

                obj.options.push(optionObj)
            }
        })

        setOptionFunctions(optionsData, obj)

        await options.parse(optionsData, true)
        d.err = optionsData.err
        if (d.err) return;

        let newCommand = await d.client.application.commands.create(obj).catch(e => new d.error("custom", d, e.message))

        return returnId === 'true' ? newCommand?.id : undefined
    }
}