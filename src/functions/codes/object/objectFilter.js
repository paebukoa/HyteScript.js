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
    run: async d => {
        let [condition, textToReturn, sep = ',', name = 'default'] = d.func.params.splits;

        let parsedName = await d.reader.default(d, name);
        if (parsedName?.error) return;

        name = parsedName.result

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        let properties = [];

        for (const property in d.data.objects[name]) {
            if (!Object.hasOwn(d.data.objects[name], property)) return;
            let value = d.data.objects[name][property]
            let conditionWithPropertyAndValue = condition.replaceAll(/{%objProperty}/ig, property).replaceAll(/{%objValue}/ig, value);
            let textToReturnWithPropertyAndValue = textToReturn.replaceAll(/{%objProperty}/ig, property).replaceAll(/{%objValue}/ig, value);

            let parsedTextToReturnWithPropertyAndValue = await d.reader.default(d, textToReturnWithPropertyAndValue);
            if (parsedTextToReturnWithPropertyAndValue?.error) return;

            textToReturnWithPropertyAndValue = parsedTextToReturnWithPropertyAndValue.result

            let parsedCondition = await d.reader.default(d, conditionWithPropertyAndValue);
            if (parsedCondition?.error) return;

            let conditionResult = d.conditionParser.parse(d, parsedCondition.result);

            if (conditionResult) properties.push(textToReturnWithPropertyAndValue);
        };

        let parsedSep = await d.reader.default(d, sep);
        if (parsedSep?.error) return;

        sep = parsedSep.result

        return properties.join(sep);
    }
}