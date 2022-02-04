module.exports = async d => {
    let [index] = d.inside.splits;
    if(!index) {
        d.result = d.args.join(" ");
        return;
    }
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid arg index "${index}" provided.`);
        return;
    }

    d.result = d.args[Number(index) - 1];
}