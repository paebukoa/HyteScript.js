module.exports = async d => {
    let [name, description, returnId = 'false', ...optionsArr] = d.func.params.splits;

    if (!name) return d.throwError.func(d, `name field is required`)

    let commandData = {}

    returnId = returnId === 'true'

    commandData.name = name
    commandData.description = description
    commandData.type = 'CHAT_INPUT'
    commandData.options = []

    for (const options of optionsArr) {
        let args = options.split(",")
        args = args
        .map(x => x.startsWith(" ") && ![" ", "  "].includes(x) ? x.slice(1) : x)
        .map(x => x.endsWith(" ") && ![" ", "  "].includes(x) ? x.slice(0, x.length - 1) : x)

        let [type, optName, optDescription, required = 'false', autocomplete = 'false',  ...rest] = args
        
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
    
    let newCommand = await d.client.application.commands.create(commandData).catch(e => {
        return d.throwError.func(d, `failed to create command: ${e}`)
    })

    return returnId ? newCommand?.id : undefined
};