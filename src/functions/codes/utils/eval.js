// dontParseParams

module.exports = async d => {
    let [code] = d.func.params.splits;

    let parseParam = await d.reader.default(d, code);
    if (parseParam?.error) return;

    let evaled = await d.reader.default(d, parseParam.result);
    if (evaled.error) return;

    return evaled.result;
}