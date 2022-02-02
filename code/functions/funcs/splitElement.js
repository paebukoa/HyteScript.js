module.exports = async d => {
    let [index] = d.inside.splits;

    if(isNaN(index) || index <= 0) {
        d.error.set.newError(d, "function", `Invalid index "${index}" provided.`);
        return;
    }
    d.result = d.split[index - 1];
}