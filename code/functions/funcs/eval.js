module.exports = async d => {
    let code = d.params.splits;
    code = code.join("/");
    const evaled = new d.reader(d, d.protos.toUnescape(code));
    d.result = evaled.data.error.err?"":evaled.data.code.executionResult;
}