const { cloneObject, Functions } = require("../../utils/utils");

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
    dontParse: [0],
    run: async (d, choices) => {
        if (!['interaction', 'autocompleteInteraction'].includes(d.eventType)) return new d.error("notAllowed", d, 'interaction or autocompleteInteraction types')

        if (choices == undefined) return new d.error("required", d, 'choices')

        if (d.interaction.responded) return new d.error("custom", d, 'that interaction already have been respoded')

        const responseChoices = []

        let choicesData = cloneObject(d)
        choicesData.functions = new Functions(choicesData.functions).set('setchoice', { 
            code: async (d, name, value) => {
                if (name == undefined) return new d.error("required", d, 'name')
                if (value == undefined) return new d.error("required", d, 'value')

                responseChoices.push({
                    name, value
                })
            }
        })

        await choices.parse(choicesData, true)
        d.err = choicesData.err
        if (d.err) return;

        d.interaction.respond(responseChoices)
    }
};