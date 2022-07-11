module.exports = async d => {
    let [name, value] = d.function.parameters;

    if (name == undefined) return d.throwError.required(d, 'name')
    if (value == undefined) return d.throwError.required(d, 'value')

    d.data.placeholders.push({
        name: `{${name}}`, value
    })
    d.data.vars.set(name, value);
    
    if (d.clientOptions.debug === true) console.log(d.data.placeholders)
};