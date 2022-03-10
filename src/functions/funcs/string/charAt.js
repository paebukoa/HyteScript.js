module.exports = async d => {
    let [text, index] = d.params.splits;

    if (isNaN(index)) return d.error.invalidError(d, 'number', index);

    d.result = text.toLowerCase().at(Number(index));
};