module.exports = async d => {
    let [string, type = 'both'] = d.function.parameters;

    if (string == undefined) return;
    let types = {
        both: str.trim(),
        start: str.trimStart(),
        end: str.trimEnd()
    };

    return types[type];
};