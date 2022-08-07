const BaseFunctions = require('../../utils/classes/BaseFunctions')
const { getDirFiles, replaceLast } = require('../utils')

module.exports = class Functions extends BaseFunctions {
    
    _functions = new BaseFunctions()._functions

    constructor() {
        let functions = getDirFiles(`${__dirname}/../../functions`)

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
}