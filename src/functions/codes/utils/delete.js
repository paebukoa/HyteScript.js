module.exports = async d => {
    let [name] = d.func.params.splits;

    d.data.vars.delete(name);
};