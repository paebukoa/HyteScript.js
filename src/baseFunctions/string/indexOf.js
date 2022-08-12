module.exports = async d => {
    let [string, character] = d.function.parameters;
    
    if (string == undefined || character == undefined) return d.err = true;

    return string.indexOf(character) + 1;
};