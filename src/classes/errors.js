module.exports = {
    functionError(d, message) {
        d.channel.send(`\`FunctionError [function "${d.funcData.name}" in ${d.line}:${d.column}]: ${message}\``);
        d.err = true;
    },
    readerError(d, message) {
        d.channel.send(`\`ReaderError: ${message}\``);
        d.err = true;
    },
    invalidError(d, name, value) {
        d.channel.send(`\`InvalidError [function "${d.funcData.name}" in ${d.line}:${d.column}]: the ${name} "${value}" is invalid!\``);
    }
};