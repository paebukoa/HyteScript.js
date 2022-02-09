module.exports = async d => {
    let code = d.params.splits;
    code = code.join("/");
    const evaled = new d.reader(d, d.protos.toUnescape(code));
    if (!evaled.data.error.err) {
		d.result = evaled.data.code.executionResult;
	} else {
		d.result = "";
	}
}