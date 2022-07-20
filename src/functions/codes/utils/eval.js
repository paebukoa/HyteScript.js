const Compiler = require("../../../codings/compiler")

module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, code) => {
        let compiledCode = Compiler.compile(code)
        console.log(JSON.stringify(compiledCode, null, 2))

        let evalData = d.utils.duplicate(d)
        evalData.sourceCode = undefined
        evalData.command = {
            name: 'eval',
            path: `hytescript:src\\functions\\codes\\utils\\eval:36`
        }

        let parsedCode = await compiledCode.parse(evalData)
        d.error = evalData.error
        if (parsedCode.error) return;
        
        d.data = evalData.data

        return parsedCode.result
    }
}