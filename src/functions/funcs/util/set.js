module.exports = async d => {
    let [name, value] = d.params.splits;
    d.utils.vars[name] = value;
};