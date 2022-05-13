module.exports = async d => {
    let [ms = Date.now(), index = d.data.embeds.length] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.data.embeds[Number(index) - 1]) return d.throwError.invalid(d, 'index', index);

    if (isNaN(ms)) return d.throwError.invalid(d, 'timestamp', ms);

    d.data.embeds[Number(index) - 1] = d.data.embeds[Number(index) - 1]
    .setTimestamp(Number(ms));
};