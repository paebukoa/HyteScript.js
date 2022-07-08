/* const functions = new Map()
functions.set('test', {
    parseParams: true,
    run: d => {
        return d.function.parameters[0].toUpperCase()
    }
})

let d = {
    functions,
    throwError: {
        func(d, message) {
            console.log(d.sourceCode.split('\n'))
            console.error(`\x1b[31mfunctionError: ${message}\x1b[0m
\x1b[35mat command "${d.command.name}" (${d.command.path})
    at function #(${d.function.name})
        at line ${d.function.line}\x1b[0m

\x1b[36mCode:\x1b[0m
\x1b[32m${d.sourceCode.split('\n')[d.function.line - 1]}\x1b[0m`)
            d.error = true
        },
        internal(d, message) {
            console.error(`internalError in #(${d.function.name}): ${message}`)
            d.error = true
        }
    },
    command: {
        name: 'compiler-test',
        code: `
#(testemhl muI)`,
        path: 'commands/compiler-test.js'
    },
    error: false
} */

class Compiler {
    static compile(d, code) {
        const compiler = {
            type: 'text',
            source: code,
            text: [],
            writing: '',
            write(str) {
                this.writing += str
            },
            line: 1,
            function: {
                name: '',
                source: code,
                parameters: [],
                param: 0,
                parseParams: true,
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
                    parseParams: true,
                    index: 0,
                    closed: false
                }
            },
            resetWriting() {
                this.text.push(this.writing)
                this.writing = ''
            },
            async parse(d, placeholders = []) {
                return await Compiler.parse(d, this, placeholders)
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
                    compiler.type = 'function_parameters'
                    compiler.loadedFunction = d.functions.get(compiler.function.name.toLowerCase())
                    if (!compiler.loadedFunction?.parseParams && compiler.loadedFunction !== undefined) compiler.function.parseParams = false
                } else if (c === ')') {
                    compiler.type = 'text'
                    compiler.loadedFunction = d.functions.get(compiler.function.name.toLowerCase())
                    if (!compiler.loadedFunction?.parseParams && compiler.loadedFunction !== undefined) compiler.function.parseParams = false
                    compiler.function.closed = true
                    compiler.resetFunction()
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

            for (const parameter of func.parameters) {
                let compiledParameter = Compiler.compile(d, removeSpaces(parameter))
                compiledParameter.source = func.source
                compiledParameter.functions = compiledParameter.functions.map(x => {
                    x.source = func.source
                    x.line += func.line - 1
                    return x
                })

                newParameters.push(compiledParameter)
            }

            func.parameters = newParameters
            delete func.param
            
            newFunctions.push(func)
        }

        compiler.functions = newFunctions

        return {
            text: compiler.text.map(x => x.replace('\n', '').replace(/%BR%/, '\n')),
            source: compiler.source,
            functions: compiler.functions,
            parse: compiler.parse
        }
    }

    static async parse(d, compiled, placeholders = []) {

        if (d.sourceCode == undefined) d.sourceCode = compiled.source
        
        let returnData = {
            result: '',
            error: false
        }

        for (const placeholder of placeholders) {
            compiled.text = compiled.text.map(text => text.replace(eval(`/${placeholder.name}/ig`), placeholder.value))
        }

        for (const func of compiled.functions) {
            
            let funcData = {
                name: func.name,
                line: func.line,
                parameters: []
            }
            
            let oldFunction = d.function
            d.function = funcData
            
            let loadedFunc = d.functions.get(func.name.toLowerCase())
            if (!loadedFunc) {
                returnData.error = true
                d.throwError.func(d, `"${func.name}" is not a function`)
                return returnData;
            }
            
            if (!func.closed) {
                returnData.error = true
                d.throwError.func(d, `"${func.name}" is not a function`)
                return returnData;
            }

            if (func.parseParams) {
                for (const parameter of func.parameters) {
                    d.function = oldFunction
                    let parsed = await this.parse(d, parameter, placeholders)
                    
                    funcData.parameters.push(parsed.result)
                }
            } else {
                funcData.parameters = func.parameters
            }
            
            d.function = funcData

            let result

            try {
                result = await loadedFunc.run(d)
            } catch (e) {
                returnData.error = true
                d.throwError.internal(d, e.message)
                return returnData;
            }

            returnData.error = d.error

            let before = compiled.text.slice(0, func.index)
            let after = compiled.text.slice(func.index, compiled.text.length)

            compiled.text = [...before, result, ...after]
            
        }

        returnData.result = compiled.text.join('')
        return returnData;
    }
}

module.exports = Compiler

/* Compiler.compile(d, d.command.code).then(async compiled => {
    console.log((await compiled.parse(d, [{
        name: '{arrayElement}',
        value: 'something'
    }])).result)
}) */

function removeSpaces(str) {
    if (str.startsWith(' ') && str !== ' ') str = str.replace(' ', '')
    if (str.endsWith(' ') && str !== ' ') str = replaceLast(str, ' ', '')

    return str
}

function replaceLast(str, search, replacer) {
    let splitted = str.split(search)
    let final = splitted.pop()
    return final === str ? str : splitted.join(search) + replacer + final
}