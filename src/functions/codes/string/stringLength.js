module.exports = async d => {
    let [string] = d.func.params.splits;

    return string.length || 0;
};