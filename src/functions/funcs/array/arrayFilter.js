let { CheckCondition } = require("../../../classes/checkCondition.js");

module.exports = async d => {
    let [condition, jointer, name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.functionError(d, `Array with name "${name}" not found!`);

    let filtered = d.utils.array[name].filter(x => {
        let condit = condition.replaceAll("#value#", x);
        eval(CheckCondition.solve(condit));
    });

    d.result = filtered.join(jointer);
}