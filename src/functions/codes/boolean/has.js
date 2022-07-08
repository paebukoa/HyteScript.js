module.exports = async d => {
    let [name] = d.function.parameters;

    return d.data.vars.has(name);
};