module.exports = async d => {
    let [element] = d.inside.splits;

    if (element === "first") {
        d.result = d.split.shift();
    } else if (element === "last") {
        d.result = d.split.pop();
    } else if (!isNaN(element) || Number(element) > 0) {
        d.result = d.split.splice(Number(element) - 1);
    } else {
        d.error.set.newError(d, 'function', `Invalid element "${element}" provided. Element must be "first", "last" or the element index.`);
        return;
    }
}