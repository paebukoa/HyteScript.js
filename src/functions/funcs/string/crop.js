module.exports = async d => {
    let [text, maxLength = "1997", suffix = "..."] = d.params.splits;

    if (isNaN(maxLength) || Number(maxLength) < 1) return d.error.functionError(d, `The max length "${maxLength} is invalid!"`);

    let croppedText = text.slice(0, Number(maxLength));

    d.result = croppedText + suffix;

    if (croppedText === text) return d.result = croppedText;
}