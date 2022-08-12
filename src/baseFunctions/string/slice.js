module.exports = async d => {
    let [string, start, end] = d.function.parameters;

    if (isNaN(start) || Number(start) < 0) return d.err = true;
    if ((isNaN(end) || Number(end) < 0) && end != undefined) return d.err = true;

    if (end == undefined) {
        return string.slice(start);
    } else {
        return string.slice(start, end);
    };
};