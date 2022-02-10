module.exports = {
    functionError(d, message) {
        d.channel.send(`FunctionError (${d.readerData.func}, line: ${d.readerData.funcLine}): ${message}`);
        d.err = true;
    },
    readerError(d, message) {
        d.channel.send(`ReaderError: ${message}`);
        d.err = true;
    }
};