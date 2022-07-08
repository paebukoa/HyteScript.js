module.exports = async d => {
    let [name, value] = d.function.parameters;

    d.data.vars.set(name, value);
};