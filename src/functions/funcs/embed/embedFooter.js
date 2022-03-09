module.exports = async d => {
    let [name, index = '1', ...iconURL] = d.params.splits;

    url = url.join("/");

    if (isNaN(index) || Number(index) < 1 || !d.utils.embeds[Number(index) - 1]) return d.error.invalidError(d, 'index', index);

    d.utils.embeds[Number(index) - 1].footer = {name, iconURL};
};