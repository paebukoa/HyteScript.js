// dontParseParams

module.exports = async d => {
    let [condition, sep = ",", name = "default"] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    let elements = [];

    for (const element of d.data.arrays[name]) {
        let conditionWithValue = condition.unescape().replaceAll(/{%value}/ig, element);

        let readerData = await d.reader.default(d, conditionWithValue);
        if (readerData.error) return;
        
        let parsedCondition = d.conditionParser.parse(d, readerData.result);

        if (parsedCondition) elements.push(element);
    };

    return elements.join(sep);
};