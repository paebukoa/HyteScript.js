const Compiler = require("./compiler");
const Properties = require("./properties")
const AsciiTable = require('ascii-table')
const { readdirSync } = require("fs");

let escapes = [
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

class Utils {
    static unescape(str) {
        for (const escape of escapes.slice(0).reverse()) {
            str = str.replaceAll(escape[1], escape[0])
        }

        return str
    }

    static escape(str) {
        for (const escape of escapes) {
            str = str.replaceAll(escape[0], escape[1])
        }

        return str
    }

    static parseCommand(d, command, path = 'unknown') {
        const table = new AsciiTable()

        let {type = 'default', ignorePrefix = false, executeOnDm = false, enableComments = false} = command;
        // exporting optional properties from command

        if (!['string', 'undefined', undefined].includes(typeof command.name)) errorRow('invalid name')
        else if (typeof command.code !== 'string') errorRow('invalid code')
        else if (typeof type !== 'string' || !d.commandManager[type]) errorRow('invalid type')
        else {
            function* genId() {
                let id = 0

                while (true) {
                    id++
                    yield id
                }
            }

            let id = genId().next().value

            while(d.commandManager[type].get(id) != undefined) id = id.next().value
            // generating a new id

            let compiledCode = Compiler.compile(command.code)
            command.code = compiledCode

            d.commandManager[type].set(command.name ? command.name.toLowerCase() : id, {...command, type, ignorePrefix, executeOnDm, enableComments})

            table.addRow(
                typeof command.name === 'string' ? command.name : path,
                type,
                'OK',
                'none'
            )
        }

        return {table}

        function errorRow(err) {
            table.addRow(
                typeof command.name === 'string' ? command.name : path,
                type,
                'ERROR',
                err
            )
        }
    }

    /**
     * Copies an object.
     * @param {object} obj the object to duplicate
     * @returns the object copy.
     */

    static duplicate(obj) {
        let duplicated = {};

        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                let value = obj[prop]
                duplicated[prop] = value instanceof Map ? 
                new Map(value) 
                : value instanceof Set ? 
                new Set(value) 
                : value
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
                file.path = `${path}/${file.name}`
                return file
            }),
            dirs: files.filter(file => file.isDirectory())
        };

        for (let dir of types.dirs) {
            let dirFiles = Utils.getDirFiles(`${path}/${dir.name}`);
            
            types.files.push(...dirFiles)
        };

        return types.files
    };

    /**
     * Gets a property from an object.
     * @param {string} type the object type
     * @param {object} obj the object
     * @param {string} prop the property to return
     * @returns {any | undefined} the property value 
     */

    static getProperty(type, obj, prop) {
        return Properties[type](obj, prop)
    }
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

    static async parseMessage(d, message) {
        let oldMessage = Utils.duplicate(d.data.message)
        d.data.message.reset()

        let parsedMessage = await message.parse(d)
        if (parsedMessage.error) return {error: true}
        
        d.data.message = oldMessage

        return parsedMessage.message
    }

    static async wait(ms) {
        await new Promise(resolve => setTimeout(resolve, ms))
    }
}

module.exports = Utils