const { clone, ConditionParser } = require("../../utils/BaseUtils");

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
    dontParse: [1],
    run: async (d, name, condition) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (condition == undefined) return new d.error("required", d, 'condition')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        let elements = [];

        for (const element of d.data.arrays[name]) {
            const elementIndex = d.data.arrays[name].indexOf(element) + 1
            let conditionData = clone(d)

            const placeholders = d.data.placeholders.slice(0)

            conditionData.data.placeholders.push(
                {name: '{arrElement}', value: element}
            )

            let parsedcondition = await condition.parse(conditionData)
            d.err = conditionData.err
            if (parsedcondition.error) return;
            
            let conditionResult = ConditionParser.parse(d, parsedcondition.result);

            if (conditionResult) elements.push(elementIndex);

            Object.assign(d.data, conditionData.data)
            d.data.placeholders = placeholders
        };

        return elements[0];
    }
};