module.exports = async d => {
    let [string, index] = d.function.parameters;

    if (string == undefined) return d.error = true;

    if (isNaN(index) || Number(index) < 1) return d.error = true;

    return string.charAt(Number(index) - 1);
};