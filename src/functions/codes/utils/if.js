// dontParseParams

module.exports = {
    description: 'Checks a condition, if condition is true runs "then code", or else it runs "else code"',
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
    run: async d => {
    let [condition, thenCode, elseCode = ''] = d.func.params.splits;

    if (thenCode == undefined) return d.throwError.func(d, `no then code provided`);

    let readCondition = await d.reader.default(d, condition);
    if (readCondition?.error) return;

    let conditionResult = d.conditionParser.parse(d, readCondition.result);

    let readerData = '';
    if (conditionResult === true) {
        readerData = await d.reader.default(d, thenCode);
        if (readerData?.error) return;
    } else {
        readerData = await d.reader.default(d, elseCode);
        if (readerData?.error) return;
    };

    return readerData.result;
}};