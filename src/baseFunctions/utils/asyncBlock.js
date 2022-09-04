const { clone } = require("../../utils/BaseUtils.js")

module.exports = {
	description: 'Executes a code asynchronously, which means that the code which called that function will not wait for it execution to finish. Supports #(break) to stop it execution.',
    usage: 'code',
    parameters: [
        {
            name: 'Code',
            description: 'The code to be executed.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    dontParse: [0],
    async run(d, code) {
	    if (code == undefined) return new d.error("required", d, "code")

        const data = clone(d)

        code.parse(data).then(parsedCode => {
			if (data.err && !data.data.break) return d.err = data.err;
			
			delete data.data.break	 
			Object.assign(d.data, data.data)
		})
	}
}