const { cloneObject } = require("../../utils/BaseUtils.js")

module.exports = {
	description: "Executes a code asynchronously.",
    dontParse: [0],
    async run(d, code) {
	    if (code == undefined) return new d.error("required", d, "code")
        const data = cloneObject(d)
         code.parse(data).then(parsedCode => {
			 if (data.err && !data.data.break) return d.err = data.err;
		delete data.data.break	 
		Object.assign(d.data, data.data)
		})
	}
}