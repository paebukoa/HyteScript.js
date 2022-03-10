module.exports = async d => {
    let [text, char] = d.params.splits;

    d.result = text.toLowerCase().indexOf(char.toLowerCase());
};