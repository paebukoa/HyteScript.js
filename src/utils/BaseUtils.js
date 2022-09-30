const { readdirSync } = require("fs");
const BaseFunctions = require("./classes/baseFunctions");
const ConditionParser = require("./classes/conditionParser");
const Database = require("./classes/database");
const HscLog = require("./classes/HyteScriptLogs");
const Time = require("./classes/time");
const Path = require('path')
const getClassOf = (o) => {
return o.constructor.name
};

module.exports = class BaseUtils {
    static escapes = [
        ['%', '$PERCENTAGE$'],
        ["#", "%TAG%"],
        ["(", "%LP%"],
        ["|", "%BAR%"],
        [")", "%RP%"],
        [",", "%COMMA%"],
        ["{", "%LCB%"],
        ["}", "%RCB%"],
        ["!", "%EXC%"],
        ["?", "%INT%"],
        ["=", "%EQUAL%"],
        [">", "%GREATER%"],
        ["<", "%SMALLER%"],
        ["&", "%AND%"],
        ["?", "%INT%"],
        ["/", "%SLASH%"],
        ["'", "%QUOTE%"],
        ["[", "%LBRACKET%"],
        ["]", "%RBRACKET%"],
        [`"`, "%DQUOTE%"],
        ["`", "%BACKQUOTE%"],
        ["\\", "%BACKSLASH%"],
    ]

    static unescape(str) {
        for (const escape of BaseUtils.escapes.slice(0).reverse()) {
            str = str.replace(new RegExp(escape[1].replaceAll(`$`, `\\$`), 'ig'), escape[0])
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
    static clone(obj, depth = 5) {
        if (depth < 1) return obj
		if (typeof obj !== 'object' || obj == undefined) return obj;
		if (obj instanceof Array) {
            let dup = []
            for (const element of obj) {
                dup.push(BaseUtils.clone(element))
            }
            return dup
	} else if (obj instanceof RegExp) {
            return new RegExp(obj)
        } else if (obj instanceof Map) {
            return new Map(obj)
        } else if (obj instanceof Set) {
            return new Set(obj)
        } else if (obj instanceof WeakMap) {
            return new WeakMap(obj)
        } else if (obj instanceof WeakSet) {
            return new WeakSet(obj)
        } else if (obj instanceof Date) {
            let dup = new Date()
            dup.setTime(obj.getTime())
            return dup
        } else if (obj instanceof Object && getClassOf(obj) === "Object") {
			let dup = {}
			for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    dup[key] = BaseUtils.clone(element, depth - 1)
                }
            }
            return dup
		} else {
			return obj
		} 
		for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                let value = obj[prop]
                duplicated[(prop)] = value instanceof Map ? 
                new Map(value) 
                : value instanceof Set ? 
                new Set(value) 
                : Array.isArray(value) ?
				value.slice(0)
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
            dates: {},
            error: {},
            placeholders: [],
            version: require("../../package.json").version,
            logJSErrors: false
        }

        set(name, value) {
            this.__data[name] = value
        }

        newInstance() {
return BaseUtils.clone(this.__data)
        }
    }

    static BaseFunctions = BaseFunctions
    static Database = Database
    static HscLog = HscLog
    static ConditionParser = new ConditionParser({ replaceLast: this.replaceLast })
    static Time = Time
}

module.exports.Time.replaceLast = module.exports.replaceLast