module.exports = async d => {
    let [text, iconURL, index = '1'] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.data.embeds[Number(index) - 1]) return d.throwError.invalid(d, 'index', index);

    d.data.embeds[Number(index) - 1] = d.data.embeds[Number(index) - 1]
    .setFooter({
        text,
        iconURL
    });
};