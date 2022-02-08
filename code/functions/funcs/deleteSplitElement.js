module.exports = async d => {
    let [index, splitIndex = 1] = d.params.splits;

    if (isNaN(splitIndex) || Number(splitIndex) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${splitIndex}" provided.`);
        return;
    }

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, "function", `Invalid element index "${index}" provided.`);
        return;
    }
    d.split[Number(splitIndex) - 1].splice(Number(index) - 1, 1);
    d.result = "";
}