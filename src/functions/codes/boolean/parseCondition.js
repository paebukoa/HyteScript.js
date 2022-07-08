module.exports = async d => {
    let [condition] = d.function.parameters;

    return d.conditionParser.parse(d, condition);
};