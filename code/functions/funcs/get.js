module.exports = async d => {
    let [name] = d.inside.splits;
    if (!name) {
        d.error.set.newError(d, "function", "argument \"name\" must not be undefined.");
        return;
    }
    d.result = d.vars[name];
}