//dontParseParams

module.exports = async d => {
    let [condition, code, sep = ','] = d.func.params.splits;

    const parseSep = await d.reader.default(d, sep);

    let parsedCondition = await d.reader.default(d, condition);
    let conditionResult = d.conditionParser.parse(d, parsedCondition.result);

    let result = [];

    while (conditionResult === true) {
        const readerData = await d.reader.default(d, code);

        result.push(readerData.result);

        parsedCondition = await d.reader.default(d, condition);
        conditionResult = d.conditionParser.parse(d, parsedCondition.result);
    };

    return result.join(parseSep.result);
};