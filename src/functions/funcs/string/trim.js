module.exports = async d => {
    let [text, type = "default"] = d.params.splits;

    switch (type) {
        case "default":
            d.result = text.trim();
            break;
        case "start":
            d.result = text.trimStart();
            break;
        case "end":
            d.result = text.trimEnd();
            break;
    }

    if (d.result === undefined) return d.error.functionError(d, `The type "${type}" is invalid!`);
}