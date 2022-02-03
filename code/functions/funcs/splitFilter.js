module.exports = async d => {
    let [type, text, index = 1] = d.inside.splits;

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid split index "${index}" provided.`);
        return;
    }

    if (type === "startsWith") {
        d.result = d.split[Number(index) - 1].filter(x => x.toLowerCase().startsWith(text.toLowerCase())).join(",");
    } else if (type === "endsWith") {
        d.result = d.split[Number(index) - 1].filter(x => x.toLowerCase().endsWith(text.toLowerCase())).join(",");
    } else if (type === "includes") {
        d.result = d.split[Number(index) - 1].filter(x => x.toLowerCase().includes(text.toLowerCase())).join(",");
    } else {
        d.error.set.newError(d, "function", `Invalid type "${type}" provided. Type must be "startsWith", "endsWith" or "includes".`);
        return;
    }
    
}