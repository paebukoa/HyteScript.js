module.exports = async d => {
    let [string, check] = d.func.params.splits;

    return string.startsWith(check);
}