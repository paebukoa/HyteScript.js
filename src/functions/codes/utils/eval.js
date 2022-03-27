module.exports = async d => {
    let [code] = d.func.params.splits;

    let evaled = await d.reader.default(d, code.unescape());
    return evaled.result;
}