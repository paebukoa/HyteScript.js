module.exports = async d => {
    let [name] = d.params.splits;
    d.result = d.utils.vars[name];
};