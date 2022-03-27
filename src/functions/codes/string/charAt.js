module.exports = async d => {
    let [string, index] = d.func.params.splits;

    if (string == undefined) return d.error = true;

    if (isNaN(index) || Number(index) < 1) return d.error = true;

    return string.charAt(Number(index) - 1);
};