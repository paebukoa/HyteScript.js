module.exports = async d => {
    let [text, maxLength, suffix = "..."] = d.function.parameters;

    if (isNaN(maxLength) || Number(maxLength) < 1) return new d.error('invalid', d, "max length", maxLength);

    let croppedText = text.slice(0, Number(maxLength));
    
    if (croppedText === text) return croppedText;

    return croppedText + suffix;
}