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

module.exports = throwError;