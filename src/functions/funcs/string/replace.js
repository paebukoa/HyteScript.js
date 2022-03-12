module.exports = async d => {
    let [text, part, newText, howmany = 'all'] = d.params.splits;

    text = d.prots.escape(text);
    part = d.prots.escape(part);
    newText = d.prots.escape(newText);

    if (howmany === "all") {
        d.result = text.replaceAll(part, newText);
        return;
    };

    if (isNaN(howmany)) return d.error.invalidError(d, 'amount', howmany);

    if (Number(howmany) > 0) {
        let result = text;

        for (
            let i = 0;
            i < Number(howmany);
            i++
        ) {
            result = result.replace(part, newText);
        };
    } else {
        let result = text;
        
        for (
            let i = 0;
            i > Number(howmany);
            i--
        ) {
            let replaceLast = result.split(part);

            if (replaceLast.length < 2) return;

            let slice = replaceLast.pop();

            result = replaceLast.join(part) + newText + slice;
        };
    };
};