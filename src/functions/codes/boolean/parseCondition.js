module.exports = async d => {
    let [condition] = d.func.params.splits;

    return d.conditionParser.parse(d, condition);
};