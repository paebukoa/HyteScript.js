module.exports = class BaseFunctions {
    constructor() {
        let functions = getDirFiles(`${__dirname}/../../baseFunctions`)

        for (const Function of functions) {
            let functionData = require(Function.path);
        
            const {description, usage, parameters, aliases, dontParse = [], run} = functionData
            if (typeof functionData === 'function') run = functionData;
        
            this._functions[replaceLast(Function.name, ".js", '').toLowerCase()] = {
                description, 
                usage, 
                parameters, 
                aliases,
                dontParse, 
                run, 
                path: Function.path,
                name: replaceLast(Function.name, ".js", '')
            }
        }
    }
    set(name, value) {
        this._functions[name.toLowerCase()] = value
    }
    get(name) {
        return this._functions[name.toLowerCase()]
    }
    has(name) {
        return this._functions[name.toLowerCase()] != undefined
    }
    delete(name) {
        if (this.has(name)) return eval(`delete this._functions.${name}`)
        else return false
    }
}