// dontParseParams

module.exports = async d => {
    let [condition, thenCode, elseCode = ''] = d.func.params.splits;

    if (thenCode == undefined || elseCode == undefined) return;

    let readCondition = await d.reader.default(d, condition);
    let conditionResult = d.conditionParser.parse(d, readCondition.result);

    let readerData = '';
    if (conditionResult === true) {
        readerData = await d.reader.default(d, thenCode);
    } else {
        readerData = await d.reader.default(d, elseCode);
    };

    return readerData.result;
};