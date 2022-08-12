module.exports = async d => {
    let [string, howmany = "10"] = d.function.parameters;

    if (string == undefined) return new d.error("custom", d, `text field is required`)

    if (isNaN(howmany) || Number(howmany) < 1) return d.err = true;

    return string.repeat(Number(howmany));
};