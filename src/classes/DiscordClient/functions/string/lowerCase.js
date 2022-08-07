module.exports = async (d, string) => {
    console.log(d.function.parent)

    if (!string) return;
    return string.toLowerCase();
};