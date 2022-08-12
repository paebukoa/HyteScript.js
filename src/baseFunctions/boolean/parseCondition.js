const { ConditionParser } = require("../../utils/BaseUtils");

module.exports = async d => {
    let [condition] = d.function.parameters;

    return ConditionParser.parse(d, condition);
};