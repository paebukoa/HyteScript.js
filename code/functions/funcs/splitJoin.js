module.exports = async d => {
    let [splitter, index = 1] = d.params.splits;

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${index}" provided.`);
        return;
    }

    if (!splitter) {
        d.error.set.newError(d, 'function', `Field "splitter" must be filled.`);
        return;
    } 
    d.result = d.split[Number(index) - 1].join(splitter);
}