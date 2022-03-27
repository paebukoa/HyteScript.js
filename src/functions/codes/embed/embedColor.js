module.exports = async d => {
    let [hex, index = '1'] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.data.embeds[Number(index) - 1]) return d.throwError.invalid(d, 'index', index);

    d.data.embeds[Number(index) - 1] = d.data.embeds[Number(index) - 1]
    .setColor(hex);
};