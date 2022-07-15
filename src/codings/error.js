class throwError {
    constructor(data = {sendMessage: true}) {
        this.data = data;
    };

    func(d, msg) {
        d.data.errorData = {
            funcName: d.func?.name,
            message: msg,
            type: 'FunctionError',
            parameters: d.func?.params?.full,
            commandName: d.command?.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel?.send?.(`\`FunctionError #(${d.func?.name}): ${msg}\``);
        d.error = true;
    };

    invalid(d, name, value) {
        d.data.errorData = {
            funcName: d.func?.name,
            message: `invalid ${name} in "${value}"`,
            type: 'UsageError',
            parameters: d.func?.params?.full,
            commandName: d.command?.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel?.send?.(`\`UsageError #(${d.func?.name}): invalid ${name} in "${value}"\``);
        d.error = true;
    };

    custom(d, msg) {

        d.data.errorData = {
            funcName: d.func?.name,
            message: msg,
            type: 'custom',
            parameters: d.func?.params?.full,
            commandName: d.command?.name
        };

        if (d.channel && msg.replaceAll("\n", "").trim() !== '' && this.data.sendMessage !== false) d.channel?.send?.(msg.unescape());
        d.error = true;
    };

    allow(d) {
        d.data.errorData = {
            funcName: d.func?.name,
            message: `that function can't be used in a command with type "${d.eventType}"`,
            type: 'UsageError',
            parameters: d.func?.params?.full,
            commandName: d.command?.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel?.send?.(`\`UsageError #(${d.func?.name}): that function can't be used in a command with type "${d.eventType}"\``);
        d.error = true;
    }
    
    internal(d, msg) {
        d.data.errorData = {
            funcName: d.func?.name,
            message: msg,
            type: 'InternalError',
            parameters: d.func?.params?.full,
            commandName: d.command?.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel?.send?.(`\`InternalError #(${d.func?.name}): ${msg}\`\nIf you think this is a bug, you can report it in our Discord Server:\n${d.invite}`);
        d.error = true;
    }
};

class ThrowError {
    static func(d, message) {
        d.data.error = {
            funcname: d.function.name,
            message: message,
            type: 'functionError',
            commandname: d.command.name,
            commandpath: d.command.path
        }

        console.error(`\x1b[31mfunctionError: ${message}\x1b[0m
${openError(d)}`)
        d.error = true
    }

    static invalid(d, parameter, content) {
        d.data.error = {
            funcname: d.function.name,
            message: `invalid ${parameter} in "${content}"`,
            type: 'usageError',
            commandname: d.command.name,
            commandpath: d.command.path
        }
        
        console.error(`\x1b[31musageError: invalid ${parameter} in "${content}"\x1b[0m
${openError(d)}`)
        d.error = true
    }

    static notAllowed(d, allowed) {
        d.data.error = {
            funcname: d.function.name,
            message: `that function can only be used in ${allowed}`,
            type: 'functionError',
            commandname: d.command.name,
            commandpath: d.command.path
        }
        
        console.error(`\x1b[31mfunctionError: that function can only be used in ${allowed}\x1b[0m
${openError(d)}`)
        d.error = true
    }

    static internal(d, e) {
        d.data.error = {
            funcname: d.function.name,
            message: e.message,
            type: 'internalError',
            commandname: d.command.name,
            commandpath: d.command.path
        }
        
        if (d.clientOptions.logErrors) console.log(e)
        console.error(`\x1b[31minternalError: ${e.message}\x1b[0m
${openError(d)}`)
        d.error = true
    }

    static required(d, parameter) {
        d.data.error = {
            funcname: d.function.name,
            message: `${parameter} is required`,
            type: 'functionError',
            commandname: d.command.name,
            commandpath: d.command.path
        }
        
        console.error(`\x1b[31mfunctionError: ${parameter} is required\x1b[0m
${openError(d)}`)
        d.error = true
    }
}

module.exports = ThrowError;

function openError(d) {
    return `\x1b[35mat command "${typeof d.command.name === 'string' ? d.command.name : 'unknown'}" (${d.command.path})
    at function #(${d.function.name})
        at line ${d.function.line}\x1b[0m

\x1b[36mCode:\x1b[0m
\x1b[32m${d.sourceCode.split('\n')[d.function.line - 1]}\x1b[0m`
}