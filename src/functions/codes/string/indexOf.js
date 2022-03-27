module.exports = async d => {
    let [string, character] = d.func.params.splits;
    
    if (string == undefined || character == undefined) return d.error = true;

    return string.indexOf(character) + 1;
};