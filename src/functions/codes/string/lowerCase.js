module.exports = async d => {
    let [string] = d.func.params.splits;

    if (!string) return;
    return string.toLowerCase();
};