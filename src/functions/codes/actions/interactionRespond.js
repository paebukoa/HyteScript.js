module.exports = {
    description: 'Responds to autocomplete interaction.',
    usage: 'choices',
    parameters: [
        {
            name: 'Choices',
            description: 'A builder parameter; sets the choices to be sent.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, choices) => {
        if (!['interaction', 'autocompleteInteraction'].includes(d.eventType)) return d.throwError.notAllowed(d, 'interaction or autocompleteInteraction types')

        if (choices == undefined) return d.throwError.required(d, 'choices')

        if (d.interaction.responded) return d.throwError.func(d, 'that interaction already have been respoded')

        const responseChoices = []

        let choicesData = d.utils.duplicate(d)
        choicesData.functions.set('setchoice', {
            parseParams: true,
            code: async (d, name, value) => {
                if (name == undefined) return d.throwError.required(d, 'name')
                if (value == undefined) return d.throwError.required(d, 'value')

                responseChoices.push({
                    name, value
                })
            }
        })

        await choices.parse(choicesData, true)
        d.error = choicesData.error
        if (d.error) return;

        d.interaction.respond(responseChoices)
    }
};