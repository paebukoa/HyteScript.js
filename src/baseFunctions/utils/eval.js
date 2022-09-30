const Compiler = require("../../classes/compiler")
const { unescape, clone } = require("../../utils/BaseUtils")

module.exports = {
    description: 'Compiles and run provided code. Important note: that function must be used carefully. That function can also make your code a bit slower.',
    usage: 'code',
    parameters: [
        {
            name: 'Code',
            description: 'The code to be evaluated.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, code) => {
        let compiledCode = Compiler.compile(unescape(code))

        let evalData = clone(d)
        evalData.sourceCode = undefined
        evalData.command = {
            name: 'eval',
            path: `hytescript:baseFunctions\\utils\\eval:25`
        }

        let parsedCode = await compiledCode.parse(evalData)
        d.err = evalData.err
        if (parsedCode.error) return;
        
        d.data = evalData.data

        return parsedCode.result
    }
}