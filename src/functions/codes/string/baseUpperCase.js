module.exports = async d => {
    let [string] = d.function.parameters;

    if (string == undefined) return;

    const chars = [...string];
    const firstChar = chars.shift();

    return firstChar.toUpperCase() + chars.join("").toLowerCase();
};