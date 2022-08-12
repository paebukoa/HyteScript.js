module.exports = async d => {
    let [string, index] = d.function.parameters;

    if (string == undefined) return d.err = true;

    if (isNaN(index) || Number(index) < 1) return d.err = true;

    return string.charAt(Number(index) - 1);
};