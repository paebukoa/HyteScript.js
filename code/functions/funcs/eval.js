module.exports = async d => {
    let code = d.inside.splits;
    code = code.join("/");
    const evaled = new d.reader(d, code);
    d.result = evaled.result;
}