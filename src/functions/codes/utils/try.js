const throwError = require("../../../codings/error.js");
const { duplicate } = require("../../../codings/utils.js");

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
    run: async (d, tryCode, catchCode, finallyCode) => {
        if (tryCode == undefined) return d.throwError.required(d, `try code`);
        if (catchCode == undefined) return d.throwError.required(d, `catch code`);

        let tryData = d.utils.duplicate(d)
        tryData.throwError.logError = false

        let parseTry = tryCode.parse(tryData)
        d.data = tryData.data
        if (tryData.error && !tryData.data.break) {
            if (typeof catchCode === 'object') {
                let parsedcatchCode = await catchCode.parse(d)
                if (parsedcatchCode.error) return;
                return parsedcatchCode.result
            }
        } else if (typeof finallyCode === 'object') {
            let parsedfinallyCode = await finallyCode.parse(d)
            if (parsedfinallyCode.error) return;
            return parsedfinallyCode.result
        } else return parseTry.result
    }
};