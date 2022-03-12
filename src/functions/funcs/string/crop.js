module.exports = async d => {
    let [text, maxLength, suffix = "..."] = d.params.splits;

    if (isNaN(maxLength) || Number(maxLength) < 1) return d.error.invalidError(d, "maxLength", maxLength);

    let croppedText = text.slice(0, Number(maxLength));

    d.result = croppedText + suffix;

    if (croppedText === text) return d.result = croppedText;
}