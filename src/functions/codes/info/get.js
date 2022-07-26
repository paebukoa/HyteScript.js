module.exports = {
    run: async (d, name) => {
        let varValue = d.data.vars.get(name)
        if (varValue == undefined) return d.throwError.invalid(d, 'variable name', name)

        return varValue
    }
};
