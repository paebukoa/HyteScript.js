const { clone, BaseFunctions, replaceLast, getDirFiles } = require("../../utils/BaseUtils")

module.exports = {
	description: 'Executes a code in a block, which supports #(break) to stop it execution.',
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

        let returnValue;

        let data = clone(d)
        data.functions = new BaseFunctions({ replaceLast, clone, getDirFiles }, data.functions).set("return", {
            async run(d, value) {
                returnValue = value
                d.err = true
                d.data.break = true
            }
        })

        const parseCode = await code.parse(data)

        d.data = data.data

        if (d.err && !d.data.break) return;
		
		d.err = false
		delete d.data.break

        return returnValue ?? parseCode.result;
	}
}