module.exports = async d => {
    let [string] = d.params.splits;

    d.result = string.length || 0;
};