const { replaceLast, getDirFiles, clone, BaseFunctions } = require('../../utils/BaseUtils');

module.exports = {
    description: 'Checks if a code throws an error.',
    usage: 'tryCode | catchCode | finallyCode?',
    parameters: [
        {
            name: 'Try code',
            description: 'The code to be tested.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Catch code',
            description: 'Code to be runned when tested code throws an error.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Finally code',
            description: 'Code to be runned when tested code don\'t throws an error (can be left empty, then value returned will be try code).',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    dontParse: [0, 1, 2],
    run: async (d, tryCode, catchCode, finallyCode) => {
        if (tryCode == undefined) return new d.error("required", d, `try code`);
        if (catchCode == undefined) return new d.error("required", d, `catch code`);

        d.error.logErrors = false

        let parseTry = await tryCode.parse(d)
        
        d.error.logErrors = true

        if (d.err && !d.data.break) {
            d.err = false
            if (typeof catchCode === 'object') {
				let catchData = clone(d)
				catchData.functions = new BaseFunctions({replaceLast, getDirFiles, clone}, catchData.functions).set('error', {
					run: async (d, property) => {
						if (property == undefined) return new d.error('required', d, 'property')
						return d.data.error[property]
					}
				})
				
                let parsedcatchCode = await catchCode.parse(catchData)
                if (parsedcatchCode.error) return;
				d.data = catchData.data
				
                return parsedcatchCode.result
            }
        } else if (typeof finallyCode === 'object') {
            let parsedfinallyCode = await finallyCode.parse(d)
            if (parsedfinallyCode.error) return;
            return parsedfinallyCode.result
        } else return parseTry.result
    }
};