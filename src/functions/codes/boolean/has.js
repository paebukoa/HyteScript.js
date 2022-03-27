module.exports = async d => {
    let [name] = d.func.params.splits;

    return d.data.vars.has(name);
};