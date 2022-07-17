module.exports = {
    parseParams: false,
    run: async (d, name, description, options, returnId = 'false') => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (options == undefined) return d.throwError.required(d, 'options')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (typeof description === 'object') {
            let parseddescription = await description.parse(d)
            if (parseddescription.error) return;
            description = parseddescription.result
        }

        if (typeof returnId === 'object') {
            let parsedreturnId = await returnId.parse(d)
            if (parsedreturnId.error) return;
            returnId = parsedreturnId.result
        }

        let obj = {
            name, 
            description,
            type: 'CHAT_INPUT',
            options: []
        }

        let optionsData = d.utils.duplicate(d)

        function setOptionFunctions(optionsData) {
            optionsData.functions.set('addstringoption', {
                parseParams: false,
                run: async (d, name, description, choices, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    if (typeof name === 'object') {
                        let parsedname = await name.parse(d)
                        if (parsedname.error) return;
                        name = parsedname.result
                    }

                    if (typeof description === 'object') {
                        let parseddescription = await description.parse(d)
                        if (parseddescription.error) return;
                        description = parseddescription.result
                    }

                    if (typeof required === 'object') {
                        let parsedrequired = await required.parse(d)
                        if (parsedrequired.error) return;
                        required = parsedrequired.result
                    }

                    if (typeof autocomplete === 'object') {
                        let parsedautocomplete = await autocomplete.parse(d)
                        if (parsedautocomplete.error) return;
                        autocomplete = parsedautocomplete.result
                    }

                    let obj = {
                        type: 'STRING',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true',
                        choices: []
                    }

                    if (choices !== undefined) {
                        let choicesData = d.utils.duplicate(d)
        
                        choicesData.functions.set('addchoice', {
                            parseParams: true,
                            run: async (d, name, value) => {
                                if (name == undefined) return d.throwError.required(d, 'name')
                                if (value == undefined) return d.throwError.required(d, 'value')

                                return {name, value}
                            }
                        })

                        let wrongFunction = choices.functions.find(x => !['addchoice'].includes(x.name.toLowerCase()))
                        if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in option choices.`)

                        let parsedChoices = await choices.parse(choicesData, true)
                        d.error = choicesData.error
                        if (parsedChoices.error) return;

                        obj.choices = parsedChoices.result
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addnumberoption', {
                parseParams: true,
                run: async (d, name, description, min, max, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    if (min != undefined && isNaN(min)) return d.throwError.invalid(d, 'min number', min)
                    if (max != undefined && (isNaN(max) || Number(max) < Number(min))) return d.throwError.invalid(d, 'max number', max)

                    let obj = {
                        type: 'INTEGER',
                        name,
                        description,
                        minValue: Number(min),
                        maxValue: Number(max),
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addbooleanoption', {
                parseParams: true,
                run: async (d, name, description, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {
                        type: 'BOOLEAN',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
            optionsData.functions.set('adduseroption', {
                parseParams: true,
                run: async (d, name, description, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {
                        type: 'USER',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addchanneloption', {
                parseParams: true,
                run: async (d, name, description, channelTypes, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

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
                            if (!type) return d.throwError.invalid(d, 'type', channelType)

                            chTypes.push(type)
                        }
                    }

                    let obj = {
                        type: 'CHANNEL',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true',
                        channelTypes: chTypes
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addroleoption', {
                parseParams: true,
                run: async (d, name, description, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {
                        type: 'ROLE',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addmentionableoption', {
                parseParams: true,
                run: async (d, name, description, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {
                        type: 'MENTIONABLE',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
            optionsData.functions.set('addattachmentoption', {
                parseParams: true,
                run: async (d, name, description, required = 'false', autocomplete = 'false') => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {
                        type: 'ATTACHMENT',
                        name,
                        description,
                        required: required === 'true',
                        autocomplete: autocomplete === 'true'
                    }

                    return obj;
                }
            })
        }

        optionsData.functions.set('addsubcommand', {
            parseParams: false,
            run: async (d, name, description, options) => {
                if (name == undefined) return d.throwError.required(d, 'name')
                if (options == undefined) return d.throwError.required(d, 'options')

                if (typeof name === 'object') {
                    let parsedname = await name.parse(d)
                    if (parsedname.error) return;
                    name = parsedname.result
                }
        
                if (typeof description === 'object') {
                    let parseddescription = await description.parse(d)
                    if (parseddescription.error) return;
                    description = parseddescription.result
                }

                let obj = {
                    type: 'SUB_COMMAND',
                    name,
                    description
                }

                let optionsData = d.utils.duplicate(d)

                setOptionFunctions(optionsData)

                let wrongFunction = options.functions.find(x => !['addstringoption', 'addnumberoption', 'addbooleanoption', 'adduseroption', 'addchanneloption', 'addroleoption', 'addmentionableoption', 'addattachmentoption'].includes(x.name.toLowerCase()))
                if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in slash command options.`)

                let parsedOptions = await options.parse(optionsData, true)
                d.error = optionsData.error
                if (parsedOptions.error) return;

                obj.options = parsedOptions.result

                return obj;
            }
        })

        setOptionFunctions(optionsData)

        let wrongFunction = options.functions.find(x => !['addstringoption', 'addnumberoption', 'addbooleanoption', 'adduseroption', 'addchanneloption', 'addroleoption', 'addmentionableoption', 'addattachmentoption', 'addsubcommand'].includes(x.name.toLowerCase()))
        if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in slash command options.`)

        if (options.functions.find(x => x.name.toLowerCase() === 'addsubcommand') !== undefined && options.functions.find(x => x.name.toLowerCase() !== 'addsubcommand') !== undefined) return d.throwError.func(d, `slash command with subcommands can't have other options types.`)

        let parsedOptions = await options.parse(optionsData, true)
        d.error = optionsData.error
        if (parsedOptions.error) return;

        obj.options = parsedOptions.result

        let newCommand = await d.client.application.commands.create(obj).catch(e => {
            return d.throwError.func(d, e.message)
        })

        return returnId === 'true' ? newCommand?.id : undefined
    }
}