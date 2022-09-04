module.exports = {
	description: 'Calculates a valid math expression.',
    usage: 'expression',
    parameters: [
        {
            name: 'Expresion',
            description: 'The expression to be calculated.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
	run: async (d, expression) => {
		if (expression == undefined) return new d.error('required', d, 'expression')

		if(expression.replaceAll(" ", "") !== expression.replace(/[^-()\d/*+%.]/g, '')) return new d.error("invalid", d, 'expression', expression);
		
		let evaled;
		try {
			evaled = eval(expression.replace(/[^-()\d/*+%.]/g, ''))
		} catch {
			return new d.error("invalid", d, 'expression', expression);
		}

		return evaled;
	}
};