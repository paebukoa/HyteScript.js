const fs = require("fs");

let funcs = [];
fs.readdirSync(`${__dirname}/funcs`).map(x => {
    fs.readdirSync(`${__dirname}/funcs/${x}`).map(y => {
        let func = require(`${__dirname}/funcs/${x}/${y}`);
        funcs.push({
            name: y.split(".").slice(0, y.split(".").length - 1).join("."),
            run: func
        });
    });
});

funcs.sort((a, b) => {
    return b.name.length - a.name.length;
});

console.log(`${funcs.length} functions loaded!`)

module.exports = funcs;

