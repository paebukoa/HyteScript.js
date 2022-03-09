module.exports = async d => {
    let [expression] = d.params.splits;

    if(expression.trim() !== expression.replace(/[^-()\d/*+.]/g, '')) return d.error.invalidError(d, 'expression', expression);

    d.result = eval(expression.replace(/[^-()\d/*+.]/g, ''));
};