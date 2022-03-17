module.exports = async d => {
    let [expression] = d.params.splits;

    console.log(expression.replaceAll(" ", '') + "|" + expression.replace(/[^-()\d/*+.]/g, ''))

    if(expression.replaceAll(" ", "") !== expression.replace(/[^-()\d/*+.]/g, '')) return d.error.invalidError(d, 'expression', expression);

    d.result = eval(expression.replace(/[^-()\d/*+.]/g, ''));
};