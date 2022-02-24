module.exports = {
    functionError(d, message) {
        d.channel.send(`\`FunctionError (in function ${d.readerData.func}, line ${d.readerData.funcLine} and column ${d.readerData.funcColumn}): ${message}\``);
        d.err = true;
    },
    readerError(d, message) {
        d.channel.send(`\`ReaderError: ${message}\``);
        d.err = true;
    }
};