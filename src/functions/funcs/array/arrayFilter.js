let { CheckCondition } = require("../../../classes/checkCondition.js");

module.exports = async d => {
    let [text, type = "includes", jointer = ",", name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.functionError(d, `Array with name "${name}" not found!`);

    let types = {
        includes(x) {return x.toLowerCase().includes(text)},
        startsWith(x) {return x.toLowerCase().startsWith(text)},
        endsWith(x) {return x.toLowerCase().endsWith(text)},
        equals(x) {return x.toLowerCase() === text}
    };
    let check = types[type];
    if (!check) return d.error.functionError(d, `type "${type}" is invalid!`);

    d.result = d.utils.array[name].filter(x => check(x)).join(jointer);
}