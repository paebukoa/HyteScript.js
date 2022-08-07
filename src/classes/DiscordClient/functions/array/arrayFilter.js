module.exports = {
    description: 'Returns elements that mets to the condition.',
    usage: 'name | condition | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Condition',
            description: 'The condition to filter elements.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'Characters to separate elements filtered.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    parseParams: false,
    run: async (d, name, condition, separator = ',') => {
        if (name == undefined) return d.throwError(d, 'name')
        if (condition == undefined) return d.throwError(d, 'condition')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (typeof separator === 'object') {
            let parsedseparator = await separator.parse(d)
            if (parsedseparator.error) return;
            separator = parsedseparator.result
        }

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        let elements = [];

        for (const element of d.data.arrays[name]) {
            let conditionData = d.utils.duplicate(d)

            const placeholders = d.data.placeholders.slice(0)

            conditionData.data.placeholders.push(
                {name: '{arrElement}', value: element}
            )

            let parsedcondition = await condition.parse(conditionData)
            d.error = conditionData.error
            if (parsedcondition.error) return;
            
            let conditionResult = d.conditionParser.parse(d, parsedcondition.result);

            if (conditionResult) elements.push(element);

            Object.assign(d.data, conditionData.data)
            d.data.placeholders = placeholders
        };

        return elements.join(separator);
    }
};