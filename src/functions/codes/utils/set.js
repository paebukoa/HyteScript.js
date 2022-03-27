module.exports = async d => {
    let [name, value] = d.func.params.splits;

    d.data.vars.set(name, value);
};