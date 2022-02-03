module.exports = async d => {
    let [index, newValue, splitIndex = 1] = d.inside.splits;

    if (isNaN(splitIndex) || Number(splitIndex) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${splitIndex}" provided.`);
        return;
    }

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid element index "${index}" provided.`);
        return;
    }
    d.split[Number(splitIndex) - 1][Number(index) - 1] = newValue;
    d.result = "";
}