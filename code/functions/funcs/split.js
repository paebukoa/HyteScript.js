module.exports = async d => {
    let [text, splitter, index = 1] = d.inside.splits;
    
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${index}" provided.`);
        return;
    }

    d.split[Number(index) - 1] = text.split(splitter);
    d.result = "";
}