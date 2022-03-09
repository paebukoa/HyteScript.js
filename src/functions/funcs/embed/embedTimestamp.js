module.exports = async d => {
    let [ms = Date.now(), index = "1"] = d.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.utils.embeds[Number(index) - 1]) return d.error.invalidError(d, 'index', index);

    if (isNaN(ms)) return d.error.invalidError(d, 'timestamp', ms);

    d.embeds[Number(index) - 1].timestamp = Number(ms);
};