let { CheckCondition } = require("../../../classes/checkCondition.js");

module.exports = async d => {
    let [condition] = d.params.splits;

    d.result = eval(CheckCondition.solve(condition));
};