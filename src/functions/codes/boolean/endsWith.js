module.exports = async d => {
    let [string, check] = d.function.parameters;

    return string.endsWith(check);
}