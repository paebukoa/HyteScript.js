const HscLog = require("../../../../utils/classes/HyteScriptLogs")
const { replaceLast } = require("../../../../utils/BaseUtils")

module.exports = class error {
    static logErrors = true

    constructor(type, ...parameters) {

        const types = {
            client(message) {
                if (error.logErrors) HscLog.error(`\x1b[31m${message}`)
            },
            command(path, message, exitProcess = true) {
                if (error.logErrors) HscLog.error(`\x1b[31m${message}\n\x1b[30m  at ${path.replaceAll('/', '\\')}`, exitProcess)
            },
            invalid(d, target, value) {
                d.data.error = {
                    function: d.function.name,
                    message: `invalid ${target} in "${value}"`,
                    commandname: d.command.name,
                    commandpath: d.command.path
                }
                if (error.logErrors) HscLog.error(`\x1b[31m${d.data.error.message}\n${getInfo(d)}`, false)
                d.err = true
            },
            notAllowed(d, allowed) {
                d.data.error = {
                    function: d.function.name,
                    message: `#(${d.function.name}) is only allowed in ${allowed}`,
                    commandname: d.command.name,
                    commandpath: d.command.path
                }
                if (error.logErrors) HscLog.error(`\x1b[31m${d.data.error.message}\n${getInfo(d)}`, false)
                d.err = true
            },
            custom(d, message) {
                d.data.error = {
                    function: d.function.name,
                    message,
                    commandname: d.command.name,
                    commandpath: d.command.path
                }
                if (error.logErrors) HscLog.error(`\x1b[31m${d.data.error.message}\n${getInfo(d)}`, false)
                d.err = true
            },
            required(d, target) {
                d.data.error = {
                    functionname: d.function.name,
                    message: `parameter \x1b[31;1m${target}\x1b[0;31m is required`,
                    commandname: d.command.name,
                    commandpath: d.command.path
                }
                if (error.logErrors) HscLog.error(`\x1b[31m${d.data.error.message}\n${getInfo(d)}`, false)
                d.err = true
            },
            internal(d, message) {
                d.data.error = {
                    functionname: d.function.name,
                    message: `(internal) ${message}`,
                    commandname: d.command.name,
                    commandpath: d.command.path
                }
                if (error.logErrors) HscLog.error(`\x1b[31m${d.data.error.message}\n${getInfo(d)}`, false)
                d.err = true
            },
            requiredIntent(event, ...intents) {
                intents = replaceLast(intents.join(', '), ',', ' and')

                HscLog.warn(`\x1b[31m${event} requires ${intents} intents. Enable these intents in your client options.`)
            }
        }

        const send = types[type]
        if (!send) throw new TypeError(`invalid type in "${type}"`)
        
        send(...parameters)

        function getInfo(d) {
            return `\x1b[35m  at command "${typeof d.command.name === 'string' ? d.command.name : 'unknown'}" (${d.command.path})
  at function #(${d.function.name})
  at line ${d.function.line}\x1b[0m

\x1b[36mCode:\x1b[0m
\x1b[32m${d.sourceCode.split('\n')[d.function.line - 1]}\x1b[0m`
        }
    }
}