// dontParseParams

module.exports = async d => {
    let [condition, thenCode, elseCode = ''] = d.func.params.splits;

    if (thenCode == undefined) return d.throwError.func(d, `no then code provided`);

    let readCondition = await d.reader.default(d, condition);
    if (readCondition.error) return;

    let conditionResult = d.conditionParser.parse(d, readCondition.result);

    let readerData = '';
    if (conditionResult === true) {
        readerData = await d.reader.default(d, thenCode);
        if (readerData.error) return;
    } else {
        readerData = await d.reader.default(d, elseCode);
        if (readerData.error) return;
    };

    return readerData.result;
};