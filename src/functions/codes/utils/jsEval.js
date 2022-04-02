module.exports = async d => {
    let [jsCode] = d.func.params.splits;

    return eval(jsCode);
};