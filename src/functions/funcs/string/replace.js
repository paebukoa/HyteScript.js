module.exports = async d => {
    let [string, searchMask, replaceMask, howmany = 'all'] = d.params.splits;

    string = d.prots.escape(string);
    searchMask = d.prots.escape(searchMask);
    replaceMask = d.prots.escape(replaceMask);

    if (howmany === "all") {
        d.result = string.replaceAll(searchMask, replaceMask);
        return;
    };

    if (isNaN(howmany)) return d.error.invalidError(d, 'amount', howmany);

    if (Number(howmany) > 0) {
        let result = string;

        for (
            let i = 0;
            i < Number(howmany);
            i++
        ) {
            result = result.replace(searchMask, replaceMask);
        };
    } else {
        let result = string;
        
        for (
            let i = 0;
            i > Number(howmany);
            i--
        ) {
            let replaceLast = result.split(searchMask);

            if (replaceLast.length < 2) return;

            let rest = replaceLast.pop();

            result = replaceLast.join(searchMask) + replaceMask + rest;
        };
    };
};