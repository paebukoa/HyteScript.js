const {BaseFunctions, replaceLast, getDirFiles, clone} = require('../../../../utils/BaseUtils')

module.exports = class Functions extends BaseFunctions {
    constructor(f) {
        let baseFunctions = super({replaceLast, getDirFiles, clone}, f)

        this._functions = baseFunctions._functions

        if (f == undefined) {
            let functions = getDirFiles(`${__dirname}/../../functions`)
            
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
        }
    }
}