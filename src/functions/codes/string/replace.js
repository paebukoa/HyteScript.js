module.exports = async d => {
    let [string, search, replacer, howmany = "all"] = d.func.params.splits;

    if (string == undefined) return d.throwError.func(d, `text field is required`)
    if (search == undefined) return d.throwError.func(d, `search field is required`)
    if (replacer == undefined) return d.throwError.func(d, `replacer field is required`)

    if (howmany === "all") {
        return string.replaceAll(search, replacer);
    } else if (Number(howmany) > 0) {
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
    } else d.error = true;
    
};