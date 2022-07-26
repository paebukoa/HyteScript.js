module.exports = {
    description: 'Returns the first element that mets to the condition.',
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
            description: 'The condition to find element.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, name, condition) => {
        if (name == undefined) return d.throwError(d, 'name')
        if (condition == undefined) return d.throwError(d, 'condition')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        let elements = [];

        for (const element of d.data.arrays[name]) {
            const elementIndex = d.data.arrays[name].indexOf(element) + 1
            let conditionData = d.utils.duplicate(d)

            const placeholders = d.data.placeholders.slice(0)

            conditionData.data.placeholders.push(
                {name: '{arrElement}', value: element}
            )

            let parsedcondition = await condition.parse(conditionData)
            d.error = conditionData.error
            if (parsedcondition.error) return;
            
            let conditionResult = d.conditionParser.parse(d, parsedcondition.result);

            if (conditionResult) elements.push(elementIndex);

            Object.assign(d.data, conditionData.data)
            d.data.placeholders = placeholders
        };

        return elements[0];
    }
};