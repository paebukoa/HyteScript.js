module.exports = async d => {
    let [text, sample] = d.params.splits;

    d.result = text.includes(sample);
};