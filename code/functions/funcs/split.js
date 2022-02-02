module.exports = async d => {
    let [text, splitter] = d.inside.splits;
    
    if (!text || text == "" || !splitter || splitter == "") {
        d.error.set.newError(d, 'function', `Fields "text" and "splitter" must be filled.`);
        return;
    }

    d.split = text.split(splitter);
}