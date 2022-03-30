class throwError {
    constructor(data = {sendMessage: true}) {
        this.data = data;
    };

    func(d, msg) {
        d.data.errorData = {
            funcName: d.func.name,
            message: msg,
            parameters: d.func.params.full,
            commandName: d.command.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel.send(`\`FunctionError #(${d.func.name}): ${msg}\``);
        d.error = true;
    };

    invalid(d, name, value) {
        d.data.errorData = {
            funcName: d.func.name,
            message: `invalid ${name} in "${value}"`,
            parameters: d.func.params.full,
            commandName: d.command.name
        };

        if (d.channel && this.data.sendMessage !== false) d.channel.send(`\`ArgumentError #(${d.func.name}): invalid ${name} in "${value}"\``);
        d.error = true;
    };

    custom(d, msg) {
        d.data.errorData = {
            /** */

            funcName: d.func.name,
            message: msg,
            parameters: d.func.params.full,
            commandName: d.command.name
        };

        if (d.channel && msg.replaceAll("\n", "").trim() !== '' && this.data.sendMessage !== false) d.channel.send(msg.unescape());
        d.error = true;
    };
};

module.exports = throwError;