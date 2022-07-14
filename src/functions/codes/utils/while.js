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
    parseParams: false,
    run: async (d, condition, code, sep = ',') => {
        if (condition == undefined) return d.throwError.required(d, 'condition')
        if (code == undefined) return d.throwError.required(d, 'code')

        
        if (typeof sep === 'object') {
            let parsedSep = await sep.parse(d)
            if (parsedSep.error) return;
            sep = parsedSep.result
        }

        let parsedCondition = await condition.parse(d)
        if (parsedCondition.error) return;
        
        let conditionResult = d.conditionParser.parse(d, parsedCondition.result)
        
        let result = [];
        
        while (conditionResult === true) {
            const parseCode = await code.parse(d)
            if (parseCode.error) return;
            
            result.push(parseCode.result);
            
            parsedCondition = await condition.parse(d)
            if (parsedCondition.error) return;
            
            conditionResult = d.conditionParser.parse(d, parsedCondition.result);
        }
        
        return result.join(sep);
    }
}