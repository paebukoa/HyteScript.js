module.exports = async d => {
    let [name] = d.func.params.splits;

    if (d.data.vars.get(name) == undefined) return d.throwError.func(d, `the variable "${name}" doesn't exists`);

    return d.data.vars.get(name);
};