module.exports = async d => {
    let [string, howmany = "10"] = d.func.params.splits;

    if (string == undefined) return d.throwError.func(d, `text field is required`)

    if (isNaN(howmany) || Number(howmany) < 1) return d.error = true;

    return string.repeat(Number(howmany));
};