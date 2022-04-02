module.exports = async d => {
    let [string] = d.func.params.splits;

    if (string == undefined) return;

    const chars = [...string];
    const firstChar = chars.shift();

    return firstChar.toUpperCase() + chars.join("").toLowerCase();
};