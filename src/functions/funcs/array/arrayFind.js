const { CheckCondition } = require("../../../classes/checkCondition");

module.exports = async d => {
    let [condition, jointer = ",", name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.functionError(d, `Array with name "${name}" not found!`);

    let found = d.utils.array[name].find(x => {
        let condit = condition.replaceAll("#value#", x);
        eval(CheckCondition.solve(condit));
    });
    
    d.result = found;
}