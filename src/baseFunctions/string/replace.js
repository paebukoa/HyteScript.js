module.exports = async d => {
    let [string, search, replacer, howmany = "all"] = d.function.parameters;

    if (string == undefined) return new d.error("custom", d, `text field is required`)
    if (search == undefined) return new d.error("custom", d, `search field is required`)
    if (replacer == undefined) return new d.error("custom", d, `replacer field is required`)

    if (howmany === "all") {
        return string.replaceAll(search, replacer);
    } else if (Number(howmany) >= 0) {
        let result = string;

        for (let i = 0;i < howmany;i++) {
            result = result.replace(search, replacer);
        };

        return result;
    } else if(Number(howmany) < 0) {
        let result = string;

        for (let i = howmany;i < 0;i++) {
            result = result.replaceLast(search, replacer);
        };

        return result;
    } else d.err = true;
    
};