module.exports = async (d, string, index) => {
    if (string == undefined) return new d.error("required", d, "string")
    if (index == undefined) return new d.error("required", d, "index")

    if (isNaN(index) || Number(index) < 1) return new d.error("invalid", d, "index number", index)

    return string.charCodeAt(Number(index) - 1);
};