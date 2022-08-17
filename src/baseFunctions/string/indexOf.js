module.exports = async (d, string, character) => { 
    if (string == undefined) return new d.error("required", d, "string");
    if (character == undefined) return new d.error("required", d, "character");

    return string.indexOf(character) + 1;
};