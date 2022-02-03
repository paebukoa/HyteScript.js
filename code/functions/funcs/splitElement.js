module.exports = async d => {
    let [index, splitIndex = 1] = d.inside.splits;

    if(isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, "function", `Invalid element index "${index}" provided.`);
        return;
    }

    if (isNaN(splitIndex) || Number(splitIndex) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${splitIndex}" provided.`);
        return;
    }

    d.result = d.split[Number(splitIndex) - 1][Number(index) - 1];
}