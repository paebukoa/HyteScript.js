module.exports = async d => {
    let [name, value] = d.inside.splits;
    if (!name) {
        d.error.set.newError(d, "function", "argument \"name\" must not be undefined.");
        return;
    } 
    d.vars[name] = value;
}