module.exports = {
    description: 'Checks a condition, if condition is true runs "then code", else it runs "else code"',
    usage: 'condition | thenCode | elseCode?',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to be checked',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Then code',
            description: 'Code to be runned when condition is true.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Else code',
            description: 'Code to be runned when condition is false.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, condition, thenCode, elseCode = '') => {
    if (condition == undefined) return d.throwError.required(d, 'condition')
    if (thenCode == undefined) return d.throwError.required(d, 'then code')

    if (typeof condition === 'object') {
        let parsedCondition = await condition.parse(d)
        if (parsedCondition.error) return;
        condition = parsedCondition.result
    }

    let conditionResult = d.conditionParser.parse(d, condition);

    let result = '';
    if (conditionResult === true) {

        if (typeof thenCode === 'object') {
            let parsedThenCode = await thenCode.parse(d)
            if (parsedThenCode.error) return;
            result = parsedThenCode.result
        }

    } else {

        if (typeof elseCode === 'object') {
            let parsedElseCode = await elseCode.parse(d)
            if (parsedElseCode.error) return;
            result = parsedElseCode.result
        }

    };

    return result;
}};