module.exports = async d => {
    let [expression] = d.function.parameters;

    if(expression.replaceAll(" ", "") !== expression.replace(/[^-()\d/*+%.]/g, '')) return new d.error("invalid", d, 'expression', expression);
	
    let evaled;
	try {
		evaled = eval(expression.replace(/[^-()\d/*+%.]/g, ''))
	} catch {
		return new d.error("invalid", d, 'expression', expression);
	}

    return evaled;
};