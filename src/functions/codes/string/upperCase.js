module.exports = async d => {
    let [string] = d.function.parameters;

    if (!string) return;
    return string.toUpperCase();
}