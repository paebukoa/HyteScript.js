const { clone, ConditionParser } = require("../../utils/BaseUtils")

module.exports = {
    description: 'Filters object properties which meets condition.',
    usage: 'name | condition | textToReturn | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Condition',
            description: 'The condition to filter properties. Use {objProperty} for get the property, and {objValue} for get it value.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Text to return',
            description: 'Text to be returned for each filtered property. Use {objProperty} for get the property, and {objValue} for get it value.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'Characters to separate filtered properties.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    dontParse: [1, 2],
    run: async (d, name, condition, textToReturn, separator = ',') => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (condition == undefined) return new d.error("required", d, 'condition')
        if (textToReturn == undefined) return new d.error("required", d, 'text to return')

        if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

        let properties = [];

        for (const property in d.data.objects[name]) {
            if (Object.prototype.hasOwnProperty.call(d.data.objects[name], property)) {
                let value = d.data.objects[name][property]

                let conditionData = clone(d)

                const placeholders = d.data.placeholders.slice(0)

                conditionData.data.placeholders.push(
                    { name: '{objProperty}', value: property},
                    { name: '{objValue}', value}
                )

                const parsedCondition = await condition.parse(conditionData)
                d.err = conditionData.err
                if (parsedCondition.error) return;

                let conditionResult = ConditionParser.parse(d, parsedCondition.result)

                if (conditionResult) {
                    const parsedText = await textToReturn.parse(conditionData)
                    d.err = conditionData.err
                    if (parsedText.error) return;

                    properties.push(parsedText.result)
                }
                
                Object.assign(d.data, conditionData.data)
                d.data.placeholders = placeholders
            }
        };

        return properties.join(separator);
    }
}