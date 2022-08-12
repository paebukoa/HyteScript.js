const { unescape, replaceLast, cloneObject, HscLog } = require("../utils/BaseUtils")

module.exports = class Compiler {
    static compile(code, trimStart = true, line = 1) {
        const compiler = {
            type: 'text',
            source: code,
            text: [],
            writing: '',
            write(str) {
                this.writing += str
            },
            line: line,
            function: {
                name: '',
                source: code,
                parameters: [],
                param: 0,
                index: 0,
                closed: false
            },
            functions: [],
            opens: 0,
            resetFunction() {
                this.functions.push(this.function)
                this.function = {
                    name: '',
                    source: code,
                    parameters: [],
                    param: 0,
                    index: 0,
                    closed: false
                }
            },
            resetWriting() {
                this.text.push(this.writing)
                this.writing = ''
            },
            async parse(d, returnResults = false) {
                return await Compiler.parse(d, this, returnResults)
            }
        }

        const types = {
            text(c) {
                if (c === '#') {
                    compiler.type = 'tag'
                } else {
                    compiler.write(c)
                }
            },
            
            tag(c) {
                if (c === '(') {
                    compiler.type = 'function_name'
                    compiler.resetWriting()
                    compiler.function.index = compiler.text.length + compiler.functions.length
                    compiler.opens++
                    compiler.function.line = compiler.line
                } else {
                    compiler.type = 'text'
                    compiler.write('#')
                    types.text(c)
                }
            },
            
            function_name(c) {
                if ([' ', '\n'].includes(c)) {
                    if (c == '\n') compiler.function.line++
                    compiler.type = 'function_parameters'
                } else if (c === ')') {
                    compiler.type = 'text'
                    compiler.function.closed = true
                    compiler.resetFunction()
                    compiler.opens = 0
                } else {
                    compiler.function.name += c
                }
            },

            function_parameters(c) {
                if (c === '|' && compiler.opens <= 1) return compiler.function.param++
                if (c === '(') compiler.opens++
                if (c === ')') compiler.opens--
                if (compiler.opens <= 0) {
                    compiler.type = 'text'
                    compiler.function.closed = true
                    compiler.resetFunction()
                } else {
                    if (compiler.function.parameters[compiler.function.param] == undefined) compiler.function.parameters[compiler.function.param] = ''
                    compiler.function.parameters[compiler.function.param] += c
                }
            }
        }

        code = code.split('\n').map(x => trimStart ? x.trimStart() : x).join('\n')

        let chars = [...code]

        for (const char of chars) {
            let read = types[compiler.type]
            read(char)

            if (char === '\n') compiler.line++
        }

        if (compiler.writing !== '') {
            compiler.resetWriting()
        }
        if (compiler.type === 'tag') {
            compiler.type = 'text'
            compiler.write('#')
            compiler.resetWriting()
        }
        if (compiler.type.startsWith('function_')) {
            compiler.type = 'text'
            compiler.resetFunction()
        }

        let newFunctions = []

        for (const func of compiler.functions) {
            let newParameters = []

            let lastLine = 0

            for (const parameter of func.parameters) {
                if (['', undefined].includes(parameter)) newParameters.push(undefined)
                else {
                    let compiledParameter = Compiler.compile(removeSpaces(parameter), false, func.line + lastLine)
                    compiledParameter.source = func.source
                    compiledParameter.functions = compiledParameter.functions.map(x => {
                        x.parent = func.name
                        x.source = func.source
                        lastLine += x.line - func.line
                        return x
                    })
                    
                    newParameters.push(compiledParameter)
                }
            }

            func.parameters = newParameters
            delete func.param
            
            newFunctions.push(func)
        }

        compiler.functions = newFunctions
        let obj = {
            text: compiler.text.map(x => x.replaceAll('\n', '').replace(/%BR%/ig, '\n')),
            source: compiler.source,
            functions: compiler.functions,
            parse: compiler.parse,
            nosource() {
                let comp = cloneObject(this)
                
                function removeSource(comp) {
                    if (comp == undefined) return comp
                    delete comp.source
                    comp.functions = comp.functions.map(x => {
                        delete x.source
                        x.parameters = x.parameters.map(x => removeSource(x))
                        return x
                    })
                    return comp
                }
    
                return removeSource(comp)
            }
        }

        return obj
    }

    static async parse(d, compiledCode, returnResults = false) {
        let compiled = cloneObject(compiledCode)
        
        if (d.clientOptions.debug === true && d.sourceCode == undefined) HscLog.debug(`parsing command: "${typeof d.command.name === 'string' ? d.command.name : 'unknown'}".\nCompiled code: ${require('util').inspect(compiled.nosource(), {showHidden: false, compact: true, depth: null, colors: true}, )}`) 
        
        if (d.sourceCode == undefined) d.sourceCode = compiled.source
        
        for (const placeholder of d.data.placeholders) {
            compiled.text = compiled.text.map(text => text.replace(eval(`/${placeholder.name}/ig`), placeholder.value))
        }

        let results = []
        
        for (const func of compiled.functions) {
            let funcData = {
                name: func.name,
                line: func.line,
                parameters: [],
                parent: func.parent
            }

            d.function = funcData
            
            let loadedFunc = d.functions.get(func.name.toLowerCase())
            if (!loadedFunc) {
                new d.error("custom", d, `#(${func.name}) is not a function`)
                return {error: true};
            }
            
            if (!func.closed) {
                new d.error("custom", d, `#(${func.name}) is not closed`)
                return {error: true};
            }
            
            {
                let idx = 0
                for (const parameter of func.parameters) {
                    if (parameter == undefined) funcData.parameters.push(undefined)
                    else {
                        if (!loadedFunc.dontParse.includes(idx)) {
                            d.function = undefined
                            let parsed = await this.parse(d, parameter)
                            if (parsed.error) return {error: true}
    
                            if (parsed.result.toLowerCase() === '%blank%') funcData.parameters.push('')
                            else funcData.parameters.push(parsed.result)
                        } else {
                            funcData.parameters.push(parameter)
                        }
                    }
                    idx++
                }
            }
            d.function = funcData

            let result = await loadedFunc.run(d, ...d.function.parameters).catch(e => {
                if (d.data.logJSErrors) console.error(e)
                HscLog.error(`\x1b[31m(internal) ${e.message}`)
            })

            if (d.err) return {error: true}

            results.push(result)
        
            if (result == undefined) result = ''
            else if (typeof result !== 'string') result = JSON.stringify(result)

            for (const placeholder of d.data.placeholders) {
                compiled.text = compiled.text.map(text => text.replace(eval(`/${placeholder.name}/ig`), placeholder.value))
            }

            if (d.err) return {error: true}

            let before = compiled.text.slice(0, func.index)
            let after = compiled.text.slice(func.index, compiled.text.length)

            compiled.text = [...before, result, ...after]
        }

        d.data.message.content = compiled.text.join('').trim().replaceAll('\n', '') === '' ? undefined : unescape(compiled.text.join(''))

        return {
            result: returnResults ? results : compiled.text.join(''),
            message: d.data.message,
            error: d.err
        };
    }
}

function removeSpaces(str) {
    if (str.startsWith(' ') && str !== ' ') str = str.replace(' ', '')
    if (str.endsWith(' ') && str !== ' ') str = replaceLast(str, ' ', '')

    return str
}