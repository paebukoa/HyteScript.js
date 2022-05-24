// dontParseParams

module.exports = async d => {
    let [condition, name = "default"] = d.func.params.splits;

    let parsedName = await d.reader.default(d, name)
    if (parsedName.error) return;

    name = parsedName.result.unescape()

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    let elements = [];

    for (const element of d.data.arrays[name]) {
        let elementIndex = d.data.arrays[name].indexOf(element)

        let conditionWithValue = condition.replaceAll(/{%value}/ig, element);

        let parsedCondition = await d.reader.default(d, conditionWithValue);
        if (parsedCondition.error) return;

        let conditionResult = d.conditionParser.parse(d, parsedCondition.result);

        if (conditionResult) elements.push(elementIndex);
    };

    return elements[0] + 1;
};