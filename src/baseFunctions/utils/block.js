module.exports = {
	dontParse: [0],
	async run(d, code) {
		if (code == undefined) return new d.error("required", d, "code")
        const parseCode = await code.parse(d)
        if (d.err && !d.data.break) return;
		d.err = false
		delete d.data.break
        return parseCode.result;
	}
}