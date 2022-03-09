module.exports = async d => {
    let [text, index = "1"] = d.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.utils.embeds[Number(index) - 1]) return d.error.invalidError(d, 'index', index);

    d.utils.embeds[Number(index) - 1].description = text;
};