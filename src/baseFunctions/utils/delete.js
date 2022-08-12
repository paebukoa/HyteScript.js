module.exports = async d => {
    let [name] = d.function.parameters;

    d.data.vars.delete(name);
};