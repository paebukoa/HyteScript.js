module.exports = async d => {
    let [string] = d.function.parameters;

    return string.length || 0;
};