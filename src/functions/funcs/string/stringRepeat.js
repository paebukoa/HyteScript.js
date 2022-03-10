module.exports = async d => {
    let [string, times] = d.params.splits;

    if (isNaN(times) || Number(times) < 1) return d.error.invalidError(d, 'amount', times);

    d.result = string.repeat(Number(times));
};