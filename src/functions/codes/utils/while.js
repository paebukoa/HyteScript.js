//dontParseParams

module.exports = async d => {
    let [condition, code, sep = ','] = d.func.params.splits;

    
    let parsedCondition = await d.reader.default(d, condition);
    if (parsedCondition?.error) return;
    
    let conditionResult = d.conditionParser.parse(d, parsedCondition.result.unescape());
    
    let result = [];
    
    while (conditionResult === true) {
        const readerData = await d.reader.default(d, code);
        if (readerData?.error) return;
        
        result.push(readerData.result);
        
        parsedCondition = await d.reader.default(d, condition);
        if (parsedCondition?.error) return;
        
        conditionResult = d.conditionParser.parse(d, parsedCondition.result.unescape());
    };
    
    const parseSep = await d.reader.default(d, sep);
    if (parseSep?.error) return;
    
    return result.join(parseSep.result.unescape());
};