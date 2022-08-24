module.exports = class BaseFunctions {
    _functions = {}

    constructor({ getDirFiles, replaceLast, clone }, f) {
        if (f == undefined) {
            let functions = getDirFiles(`${__dirname}/../../baseFunctions`)
    
            for (const func of functions) {
                let functionData = require(func.path);
            
                let {description, usage, parameters, aliases, dontParse = [], dontUnescape = [], run} = functionData
                if (typeof functionData === 'function') run = functionData;
            
                this._functions[replaceLast(func.name, ".js", '').toLowerCase()] = {
                    description, 
                    usage, 
                    parameters, 
                    aliases,
                    dontParse,
                    dontUnescape,
                    run, 
                    path: func.path,
                    name: replaceLast(func.name, ".js", '')
                }
            }
        } else {
            this._functions = clone(f._functions)
        }
    }
    set(name, functionData) {
        let {description, usage, parameters, aliases, dontParse = [], dontUnescape = [], run} = functionData
        if (typeof functionData === 'function') run = functionData;
    
        this._functions[name.toLowerCase()] = {
            description, 
            usage, 
            parameters, 
            aliases,
            dontParse,
            dontUnescape, 
            run,
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