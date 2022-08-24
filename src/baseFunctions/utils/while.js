const { ConditionParser } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Executes a code while condition equals to true.',
    usage: 'condition | code | separator?',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to be checked.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed if condition equals to true.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'The characters that will separate code executions results.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    dontUnescape: [0],
    dontParse: [0, 1],
    run: async (d, condition, code, sep = ',') => {
        if (condition == undefined) return new d.error("required", d, 'condition')
        if (code == undefined) return new d.error("required", d, 'code')

        let parsedCondition = await condition.parse(d)
        if (parsedCondition.error) return;
        
        let conditionResult = ConditionParser.parse(d, parsedCondition.result)
        
        let result = [];
        
        while (conditionResult === true) {
            const parseCode = await code.parse(d)
            if (parseCode.error) return;
            
            result.push(parseCode.result);
            
            parsedCondition = await condition.parse(d)
            if (parsedCondition.error) return;
            
            conditionResult = ConditionParser.parse(d, parsedCondition.result);
        }
        
        return result.join(sep);
    }
}