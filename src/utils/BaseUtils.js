const { readdirSync } = require("fs");
const BaseFunctions = require("./classes/baseFunctions");
const ConditionParser = require("./classes/conditionParser");
const Database = require("./classes/database");
const HscLog = require("./classes/HyteScriptLogs");
const Time = require("./classes/time");
const Path = require('path')

module.exports = class BaseUtils {
    static escapes = [
        ['%', '$PERCENTAGE$'],
        ["#", "%TAG%"],
        ["(", "%LP%"],
        ["|", "%BAR%"],
        [")", "%RP%"],
        [",", "%COMMA%"],
        ["{", "%LB%"],
        ["}", "%RB%"],
        ["!", "%EXC%"],
        ["=", "%EQUAL%"],
        [">", "%GREATER%"],
        ["<", "%SMALLER%"],
        ["&", "%AND%"],
        ["?", "%INT%"],
        ["/", "%SLASH%"]
    ]

    static unescape(str) {
        for (const escape of BaseUtils.escapes.slice(0).reverse()) {
            str = str.replace(new RegExp(escape[1], 'ig'), escape[0])
        }

        return str
    }

    static escape(str) {
        for (const escape of BaseUtils.escapes) {
            str = str.replaceAll(escape[0], escape[1])
        }

        return str
    }

    /**
     * Clones an object.
     * @param {object} obj the object to clone
     * @returns the object clone.
     */
    static cloneObject(obj) {
        let duplicated = {};

        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                let value = obj[prop]
                duplicated[(prop)] = value instanceof Map ? 
                new Map(value) 
                : value instanceof Set ? 
                new Set(value) 
                : (value)
            }
        }

        return duplicated
    }

    /**
     * Get all files inside a directory.
     * @param {string} path the directory files
     * @returns {array} array with files path
     */
    static getDirFiles(path) {
        let files = readdirSync(path, {withFileTypes: true})

        let types = {
            files: files.filter(file => file.isFile()).map(file => {
                file.path = Path.resolve(`${path}${Path.sep}${file.name}`)
                return file
            }),
            dirs: files.filter(file => file.isDirectory())
        };

        for (let dir of types.dirs) {
            let dirFiles = module.exports.getDirFiles(`${path}/${dir.name}`);
            
            types.files.push(...dirFiles)
        };

        return types.files
    };

    /**
     * Replaces last match with a string.
     * @param {string} str string to replace
     * @param {string} search string to be replaced
     * @param {string} replacer string which will replace the search
     * @returns {string}
     */
    static replaceLast(str, search, replacer) {
        let splitted = str.split(search)
        let final = splitted.pop()
        return final === str ? str : splitted.join(search) + replacer + final
    }

    /**
     * Pauses execution for given time.
     * @param {number} ms 
     */
    static async wait(ms) {
        await new Promise(resolve => setTimeout(resolve, ms))
    }

    static Data = class Data {
        constructor(data) {
            Object.assign(this.__data, data)
        }
        
        __data = {
            vars: new Map(),
            arrays: {},
            objects: {},
            error: {},
            placeholders: [],
            version: require("../../package.json").version,
            logJSErrors: false
        }

        set(name, value) {
            this.__data[name] = value
        }

        newInstance() {
            return BaseUtils.cloneObject(this.__data)
        }
    }

    static BaseFunctions = BaseFunctions
    static Database = Database
    static HscLog = HscLog
    static ConditionParser = new ConditionParser({ replaceLast: this.replaceLast })
    static Time = Time
}

module.exports.Time.replaceLast = module.exports.replaceLast