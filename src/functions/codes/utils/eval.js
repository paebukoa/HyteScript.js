// dontParseParams

module.exports = async d => {
    let [code] = d.func.params.splits;

    let parseParam = await d.reader.default(d, code);
    let evaled = await d.reader.default(d, parseParam.result);
    return evaled.result;
}