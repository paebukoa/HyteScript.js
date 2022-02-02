module.exports = async d => {
    let [index, newValue] = d.inside.splits;
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid index "${index}" provided.`);
        return;
    }
    d.split[index] = newValue;
    d.result = "";
}