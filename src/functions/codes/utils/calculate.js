module.exports = async d => {
    let [expression] = d.func.params.splits;

    if(expression.replaceAll(" ", "") !== expression.replace(/[^-()\d/*+.]/g, '')) return d.throwError.invalid(d, 'expression', expression);

    return eval(expression.replace(/[^-()\d/*+.]/g, ''));
};