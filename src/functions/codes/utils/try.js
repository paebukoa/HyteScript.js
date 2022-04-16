// dontParseParams

const throwError = require("../../../codings/error.js");

module.exports = async d => {
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
    
    if (readTry.error === true) {
        let readCatch = await d.reader.default(d, catchCode);
        if (readCatch.error) return;

        return readCatch.result;
    } else if (finallyCode.replaceAll("\n", "").trim() !== '') {
        let readFinally = await d.reader.default(d, finallyCode);
        if (readFinally.error) return;

        return readFinally.result;
    } else return readTry.result;
};