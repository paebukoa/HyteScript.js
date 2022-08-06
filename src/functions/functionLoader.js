const { replaceLast, getDirFiles } = require("../codings/utils");

let loadedFunctions = new Map();

let functions = getDirFiles(`${__dirname}/codes`)

for (let func of functions) {
    let functionData = require(func.path);

    let {description, usage, parameters, aliases, parseParams = true, unescapeParams = true, dontParse = [], run} = functionData
    if (typeof functionData === 'function') run = functionData;


    loadedFunctions.set(replaceLast(func.name, ".js", '').toLowerCase(), {description, usage, parameters, aliases, parseParams, unescapeParams, dontParse, run, path: func.path, name: replaceLast(func.name, ".js", '')});
}

module.exports = { loadedFunctions };