//dontParseParams

module.exports = async d => {
    let [condition, code, sep = ','] = d.func.params.splits;

    const parseSep = await d.reader.default(d, sep);
    if (parseSep.error) return;

    let parsedCondition = await d.reader.default(d, condition);
    if (parsedCondition.error) return;

    let conditionResult = d.conditionParser.parse(d, parsedCondition.result);

    let result = [];

    while (conditionResult === true) {
        const readerData = await d.reader.default(d, code);
        if (readerData.error) return;

        result.push(readerData.result);

        parsedCondition = await d.reader.default(d, condition);
        if (parsedCondition.error) return;

        conditionResult = d.conditionParser.parse(d, parsedCondition.result);
    };

    return result.join(parseSep.result);
};