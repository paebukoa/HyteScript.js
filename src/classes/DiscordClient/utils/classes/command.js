module.exports = class Command {
	static ids = {}
	
    constructor(command, manager) {
        command.path = command.path.replaceAll('/', '\\')

        let {name, code, type = 'default', aliases = [], ignorePrefix = false, executeOnDm = false, enableComments = false, path} = command;

        if (!['string', 'undefined'].includes(typeof name)) return this.row = error(command, 'invalid name')
        if (typeof type !== 'string' || !manager[type]) return this.row = error(command, 'invalid type')
        if (typeof code !== 'string') return this.row = error(command, 'invalid code')
        if (!Array.isArray(aliases)) return this.row = error(command, 'invalid aliases')

        if (name == undefined) {
            let commandId = Command.ids[type]
			if (commandId == undefined) Command.ids[type] = 0
			Command.ids[type]++
			name = Command.ids[type]
        }

        Object.assign(command, {name: typeof name === 'string' ? name.toLowerCase() : name, displayName: name, code, type, aliases, ignorePrefix, executeOnDm, enableComments, path})
        this.command = command
        this.row = {
            name: typeof command.displayName === 'string' ? command.displayName : path.includes('\\') ? path.split('\\').at(-1) : path,
            type: command.type ?? "unknown",
            status: '\x1b[32mOK\x1b[0m',
            problems: '\x1b[30mnone\x1b[0m'
        }
    }
}

function error(command, err) {
    return {
        name: typeof command.displayName === 'string' ? command.displayName : command.path.includes('\\') ? command.path.split('\\').at(-1) : command.path,
        type: command.type ?? "unknown",
        status: '\x1b[31mERROR\x1b[0m',
        problems: `\x1b[31m${err}\x1b[0m`
    }
}