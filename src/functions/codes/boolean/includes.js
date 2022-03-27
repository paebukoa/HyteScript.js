module.exports = async d => {
    let [string, search] = d.func.params.splits;

    return string.includes(search);
};