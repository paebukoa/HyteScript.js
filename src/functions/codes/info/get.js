module.exports = async d => {
    let [name] = d.func.params.splits;

    let varValue = d.data.vars.get(name)
    if (!varValue) return d.throwError.invalid(d, 'variable name', name)

    return varValue
};
