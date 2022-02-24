module.exports = async d => {
    let [arg] = d.params.splits;

    if (!arg) return d.result = d.args.join(" ");

    if (isNaN(arg) || Number(arg) < 1) return d.error.functionError(d, `the arg index "${arg}" is invalid!`);

    d.result = d.args[Number(arg) - 1];
};