module.exports = async d => {
    let [splitter] = d.inside.splits;
    if (!splitter) {
        d.error.set.newError(d, 'function', `Field "splitter" must be filled.`);
        return;
    } 
    d.result = d.split.join(splitter);
}