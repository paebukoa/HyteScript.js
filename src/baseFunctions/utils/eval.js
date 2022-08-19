const Compiler = require("../../classes/compiler")
const { unescape, clone } = require("../../utils/BaseUtils")

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
        let compiledCode = Compiler.compile(unescape(code))

        let evalData = clone(d)
        evalData.sourceCode = undefined
        evalData.command = {
            name: 'eval',
            path: `hytescript:baseFunctions\\utils\\eval:36`
        }

        let parsedCode = await compiledCode.parse(evalData)
        d.err = evalData.err
        if (parsedCode.error) return;
        
        d.data = evalData.data

        return parsedCode.result
    }
}