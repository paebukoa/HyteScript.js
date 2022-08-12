const { cloneObject, ConditionParser } = require("../../utils/BaseUtils")

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
    dontParse: [1, 2],
    run: async (d, name, condition, textToReturn) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (condition == undefined) return new d.error("required", d, 'condition')
        if (textToReturn == undefined) return new d.error("required", d, 'text to return')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

        let properties = [];

        for (const property in d.data.objects[name]) {
            if (Object.prototype.hasOwnProperty.call(d.data.objects[name], property)) {
                let value = d.data.objects[name][property]

                let conditionData = cloneObject(d)

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
        }

        return properties[0];
    }
}