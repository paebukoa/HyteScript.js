// dontParseParams

const throwError = require("../../../codings/error.js");

module.exports = {
    description: 'Checks if a code throws an error.',
    usage: 'tryCode | catchCode | finallyCode?',
    parameters: [
        {
            name: 'Try code',
            description: 'The code to be tested.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Catch code',
            description: 'Code to be runned when tested code throws an error.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Finally code',
            description: 'Code to be runned when tested code don\'t throws an error (can be left empty, then value returned will be try code).',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async d => {
    let [tryCode, catchCode, finallyCode = ''] = d.func.params.splits;

    let tryData = {};
    Object.assign(tryData, d);
    Object.assign(tryData, {
        throwError: new throwError({
            sendMessage: false
        })
    });

    if (catchCode == undefined) return d.throwError.func(d, `no catch code provided`);

    let readTry = await d.reader.default(tryData, tryCode);
    
    if (readTry?.error && !tryData.data.break) {
        let readCatch = await d.reader.default(d, catchCode);
        if (readCatch?.error) return;

        return readCatch.result;
    } else if (finallyCode.replaceAll("\n", "").trim() !== '') {
        let readFinally = await d.reader.default(d, finallyCode);
        if (readFinally?.error) return;

        return readFinally.result;
    } else return readTry.result;
}};