module.exports = {
    description: 'Finds an object property.',
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
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, name, condition, textToReturn, sep = ',') => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (condition == undefined) return d.throwError.required(d, 'condition')
        if (textToReturn == undefined) return d.throwError.required(d, 'text to return')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (typeof sep === 'object') {
            let parsedsep = await sep.parse(d)
            if (parsedsep.error) return;
            sep = parsedsep.result
        }

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        let properties = [];

        for (const property in d.data.objects[name]) {
            if (Object.prototype.hasOwnProperty.call(d.data.objects[name], property)) {
                let value = d.data.objects[name][property]

                let conditionData = d.utils.duplicate(d)

                const placeholders = d.data.placeholders.slice(0)

                conditionData.data.placeholders.push(
                    { name: '{objProperty}', value: property},
                    { name: '{objValue}', value}
                )

                const parsedCondition = await condition.parse(conditionData)
                d.error = conditionData.error
                if (parsedCondition.error) return;

                let conditionResult = d.conditionParser.parse(d, parsedCondition.result)

                if (conditionResult) {
                    const parsedText = await textToReturn.parse(conditionData)
                    d.error = conditionData.error
                    if (parsedText.error) return;

                    properties.push(parsedText.result)
                }
                
                Object.assign(d.data, conditionData.data)
                d.data.placeholders = placeholders
            }
        };

        return properties.join(sep);
    }
}