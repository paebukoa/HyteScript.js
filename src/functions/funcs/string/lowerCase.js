module.exports = async d => {
    let [text] = d.params.splits;
    
    d.result = text.toLowerCase();
}