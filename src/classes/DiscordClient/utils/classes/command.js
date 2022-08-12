module.exports = class Command {
    constructor(command, manager) {
        command.path = command.path.replaceAll('/', '\\')

        let {name, code, type = 'default', ignorePrefix = false, executeOnDm = false, enableComments = false, path} = command;

        if (!['string', 'undefined'].includes(typeof name)) return this.row = error(command, 'invalid name')
        if (typeof type !== 'string' || !manager[type]) return this.row = error(command, 'invalid type')
        if (typeof code !== 'string') return this.row = error(command, 'invalid code')

        if (name == undefined) {
            let id = 1
            while(manager[type].get(id) != undefined) id++
            name = id
        }

        Object.assign(command, {type, ignorePrefix, executeOnDm, enableComments})
        this.command = command
        this.row = {
            name: typeof command.name === 'string' ? command.name : path.includes('\\') ? path.split('\\').at(-1) : path,
            type: command.type ?? "unknown",
            status: '\x1b[32mOK\x1b[0m',
            problems: '\x1b[30mnone\x1b[0m'
        }
    }
}

function error(command, err) {
    return {
        name: typeof command.name === 'string' ? command.name : command.path.includes('\\') ? command.path.split('\\').at(-1) : command.path,
        type: command.type ?? "unknown",
        status: '\x1b[31mERROR\x1b[0m',
        problems: `\x1b[31m${err}\x1b[0m`
    }
}