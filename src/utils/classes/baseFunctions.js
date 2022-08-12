module.exports = class BaseFunctions {
    _functions = {}

    constructor({ getDirFiles, replaceLast, cloneObject }, f) {
        if (f == undefined) {
            let functions = getDirFiles(`${__dirname}/../../baseFunctions`)
    
            for (const Function of functions) {
                let functionData = require(Function.path);
            
                let {description, usage, parameters, aliases, dontParse = [], run} = functionData
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
        } else {
            this._functions = cloneObject(f._functions)
        }
    }
    set(name, functionData) {
        let {description, usage, parameters, aliases, dontParse = [], run} = functionData
        if (typeof functionData === 'function') run = functionData;
    
        this._functions[name.toLowerCase()] = {
            description, 
            usage, 
            parameters, 
            aliases,
            dontParse, 
            run, 
            path: Function.path,
            name: name.toLowerCase()
        }

        return this;
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
    get size() {
        let len = 0
        for (const {} in this._functions) len++
        return len
    }
}