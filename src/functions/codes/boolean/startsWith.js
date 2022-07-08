module.exports = async d => {
    let [string, check] = d.function.parameters;

    return string.startsWith(check);
}