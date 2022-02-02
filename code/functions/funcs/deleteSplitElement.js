module.exports = async d => {
    let [index] = d.inside.splits;
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, "function", `Invalid index "${index}" provided.`);
        return;
    }
    d.split.splice(Number(index) - 1, 1);
    d.result = "";
}