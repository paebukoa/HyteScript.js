// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [condition, sep = ",", name = "default"] = d.func.params.splits;

        let parsedName = await d.reader.default(d, name)
        if (parsedName?.error) return;

        name = parsedName.result.unescape()

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        let elements = [];

        for (const element of d.data.arrays[name]) {
            let conditionWithValue = condition.replaceAll(/{%arrElement}/ig, element);

            let parsedCondition = await d.reader.default(d, conditionWithValue);
            if (parsedCondition?.error) return;
            
            let conditionResult = d.conditionParser.parse(d, parsedCondition.result);

            if (conditionResult) elements.push(element);
        };

        let parsedSep = await d.reader.default(d, sep)
        if (parsedSep?.error) return;

        sep = parsedSep.result.unescape()

        return elements.join(sep);
    }
};