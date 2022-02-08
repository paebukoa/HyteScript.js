module.exports = async d => {
    let [element, index = 1] = d.params.splits;

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${index}" provided.`);
        return;
    }

    if (element === "first") {
        d.result = d.split[Number(index) - 1].shift();
    } else if (element === "last") {
        d.result = d.split[Number(index) - 1].pop();
    } else if (!isNaN(element) || Number(element) > 0) {
        d.result = d.split[Number(index) - 1].splice(Number(element) - 1);
    } else {
        d.error.set.newError(d, 'function', `Invalid element "${element}" provided. Element must be "first", "last" or the element index.`);
        return;
    }
}