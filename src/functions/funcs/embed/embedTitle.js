module.exports = async d => {
    let [text, index = '1', ...url] = d.params.splits;

    url = url.join("/");

    if (isNaN(index) || Number(index) < 1 || !d.utils.embeds[Number(index) - 1]) return d.error.invalidError(d, 'index', index);

    d.utils.embeds[Number(index) - 1].title = text;
    d.utils.embeds[Number(index) - 1].url = url;
};