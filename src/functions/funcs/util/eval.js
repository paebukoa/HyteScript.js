module.exports = async d => {
    let [code] = d.params.splits;

    let evaled = new d.reader((d), d.prots.unescape(code));
    d.result = evaled.result;
};