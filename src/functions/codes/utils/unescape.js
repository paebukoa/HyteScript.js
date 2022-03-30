module.exports = async d => {
    [string] = d.func.params.splits;
    
    return string.unescape();
};