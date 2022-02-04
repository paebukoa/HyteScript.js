module.exports = async d => {
    let code = d.inside.splits;
    code = code.join("/");
    const evaled = new d.reader(d, d.protos.toUnescape(code));
    d.result = evaled.error?"":evaled.result;
}