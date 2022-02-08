module.exports = async d => {
    let [index = 1] = d.params.splits;

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${index}" provided.`);
        return;
    }
    d.result = d.split[Number(index) - 1].length;
}