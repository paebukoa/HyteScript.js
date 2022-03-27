module.exports = async d => {
    let [string, start, end] = d.func.params.splits;

    if (isNaN(start) || Number(start) < 0) return d.error = true;
    if ((isNaN(end) || Number(end) < 0) && end != undefined) return d.error = true;

    if (end == undefined) {
        return string.slice(start);
    } else {
        return string.slice(start, end);
    };
};