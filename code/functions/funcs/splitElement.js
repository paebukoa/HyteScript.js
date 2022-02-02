module.exports = async d => {
    let [index] = d.inside.splits;

    if(isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, "function", `Invalid index "${index}" provided.`);
        return;
    }
    d.result = d.split[Number(index) - 1];
}