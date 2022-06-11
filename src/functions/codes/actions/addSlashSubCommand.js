module.exports = {
    description: 'Adds a subcommand to a slash command.',
    usage: 'slashCommandID | createSlashCommand fields...',
    parameters: [
        {
            name: 'Slash command ID',
            description: 'The ID of the slash command which the subcommand will be added.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Others...',
            description: 'Same as #(createSlashCommand) fields.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
    let [appCmdId, name, description, ...optionsArr] = d.func.params.splits;

    let appCmd = d.client.application.commands.cache.get(appCmdId)
    if (!appCmd || appCmd.type === 'CHAT_INPUT') return d.throwError.invalid(d, 'slash command ID', appCmdId)

    let hasOtherTypes = appCmd.options.find(option => option.type !== 'SUB_COMMAND')
    if (hasOtherTypes) return d.throwError.func(d, 'slash command options must be only of type SUB_COMMAND')

    if (!name) return d.throwError.func(d, `name field is required`)

    let commandData = {}

    commandData.name = name
    commandData.description = description
    commandData.options = []

    for (const options of optionsArr) {
        let args = options.split(",")
        args = args
        .map(x => x.startsWith(" ") && ![" ", "  "].includes(x) ? x.slice(1) : x)
        .map(x => x.endsWith(" ") && ![" ", "  "].includes(x) ? x.slice(0, x.length - 1) : x)

        let [type, optName, optDescription, required, autocomplete,  ...rest] = args
        
        let optionsData = {}

        if (!optName) return d.throwError.func(d, `option name field is required`)

        optionsData.type = type.toUpperCase()
        optionsData.name = optName
        optionsData.description = optDescription
        optionsData.required = required === 'true'
        optionsData.autocomplete = autocomplete === 'true'
        
        let types = {
            string() {
                let choiceData = []

                for (const choice of rest) {
                    let [name, value] = choice.split(":")

                    choiceData.push({name, value})
                }

                optionsData.choices = choiceData

            },
            boolean() {
            },
            user() {

            },
            channel() {

            },
            role() {
                
            },
            mentionable() {

            },
            number() {

            }
        }
        
        let runType = types[type.toLowerCase()]
        if (!runType) return d.throwError.invalid(d, 'type', type)

        runType()

        commandData.options.push(optionsData)
    }

    appCmd.options.push(commandData)
    
    let newCommand = appCmd.edit({options: appCmd.options}).catch(e => {
        return d.throwError.func(d, `failed to create command: ${e}`)
    })
}};