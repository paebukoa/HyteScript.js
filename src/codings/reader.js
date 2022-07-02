const fs = require('fs')

class Reader {
    constructor (options) {
        this.options = options
    }

    async default(d, code) {
        const codeParser = (d, code) => {
            let data = {
                reading: 'text',
                code,
                result: [],
                write: '',
                funcReading: {
                    inside: '',
                    index: 0,
                    opened: false,
                    closed: false
                },
                readedFunctions: [],
                openedFunctions: 0,
                resetFunc() {
                    this.funcReading = {
                        inside: '',
                        index: 0,
                        opened: false,
                        closed: false
                    }
                }
            }

            const readTypes = {
                text(c) {
                    if (c === '#') {
                        data.reading = 'tag'

                        data.funcReading.index = data.result.push(data.write) + data.readedFunctions.length
                        data.write = ''
                        return;
                    }

                    data.write += c
                },
                tag(c) {
                    if (c !== '(') {
                        data.resetFunc()

                        data.reading = 'text'
                        data.write += '#'
                        readTypes.text(c)
                        return;
                    }
                    
                    data.reading = 'insideFunction'
                    data.funcReading.opened = true
                    data.openedFunctions++
                },
                insideFunction(c) {
                    if (c === '(') data.openedFunctions++
                    if (c === ')') data.openedFunctions--
                    if (data.openedFunctions < 1) {
                        data.reading = 'text'
                        data.funcReading.closed = true
                        data.readedFunctions.push(data.funcReading)
                        data.resetFunc()
                        return
                    }

                    data.funcReading.inside += data.openedFunctions > 1 && c === '|' ? '%_$_RDBAR_$_%' : c
                }
            }

            const codeChars = [...code]

            for (const c of codeChars) {
                const read = readTypes[data.reading]
                if (!read) return;

                read(c)
            }

            if (data.write !== '') {
                data.reading = 'text'
                data.result.push(data.write)
                data.write = ''
            }

            if (data.openedFunctions > 0) {
                data.reading = 'text'
                data.readedFunctions.push(data.funcReading)
                data.resetFunc()
            }

            if (data.reading === 'tag') {
                data.reading = 'text'
                data.result.push('#')
            }

            data.result = data.result.map(x => x.replace(/%br%/ig, '\n'))

            return data;
        }

        if (typeof code !== 'string') return {error: true}

        code = code.split('\n').map(x => {
            let result = x.trimStart().replaceAll('\t', '')
            if (d.command.enableComments === true) result = result.split('//')[0]

            return result;
        }).join('').replaceAll(`%_$_RDBAR_$_%`, '|')

        let codeParserResult = codeParser(d, code)

        for (let func of codeParserResult.readedFunctions) {
            if (d.error) return {error: true}

            let funcData = {
                name: func.inside.split(d.options.funcSep)[0].trim(),
                index: func.index,
                parameters: func.inside.split(d.options.funcSep).slice(1).join(d.options.funcSep)
            }

            if (!func.inside.includes(d.options.funcSep)) funcData.parameters = undefined

            let foundFunction = d.loadedFunctions.get(funcData.name.toLowerCase())

            if (foundFunction) {
                if (foundFunction.parseParams && funcData.parameters != undefined) {
                    let parseParameters = await this.default(d, funcData.parameters)
                    if (parseParameters?.error) return {error: true}

                    funcData.parameters = parseParameters.result
                    if (foundFunction.unescapeParams) funcData.parameters = funcData.parameters.unescape()
                }

                if (funcData.parameters) funcData.params = {
                    full: funcData.parameters,
                    splits: funcData.parameters.split('|')
                    .map(x => x.startsWith(" ") && ![' ', '  '].includes(x) ? x.slice(1) : x)
                    .map(x => x.endsWith(" ") && ![' ', '  '].includes(x) ? x.slice(0, x.length - 1) : x)
                    .map(x => x === '' ? undefined : x)
                    .map(x => x?.toLowerCase?.() === '%blank%' ? '' : x)
                }
                else funcData.params = {
                    splits: []
                }

                if (!func.closed) {
                    d.throwError.func(d, `function is not closed with ")"`)
                    return {error: true}
                }

                d.func = funcData

                let executionResult = await foundFunction.run(d)?.catch?.(e => {
                    if (d.options.logErrors) console.error(e)

                    d.throwError.internal(d, e.message)
                    return {error: true}
                })

                if (d.error) return {error: true}

                if (executionResult == undefined) executionResult = ''

                let newResult = []
                let before = codeParserResult.result.slice(0, funcData.index)
                let after = codeParserResult.result.slice(funcData.index, codeParserResult.result.length)
                newResult.push(...before, executionResult, ...after)
                codeParserResult.result = newResult
            } else {
                let replacer = `${func.opened ? '(' : ''}${func.inside}${func.closed ? ')' : ''}`

                let parsedReplacer = await this.default(d, replacer)
                if (parsedReplacer?.error) return {error: true}

                replacer = parsedReplacer.result

                let newResult = []
                let before = codeParserResult.result.slice(0, funcData.index)
                let after = codeParserResult.result.slice(funcData.index, codeParserResult.result.length)
                newResult.push(...before, `#${replacer}`, ...after)
                codeParserResult.result = newResult
            }
        }

        return {
            result: codeParserResult.result.join(''),
            data: d.data,
            error: d.error
        }
    }
}

module.exports = Reader
