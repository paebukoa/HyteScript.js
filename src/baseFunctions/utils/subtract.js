module.exports = {
    description: 'Subtracts a number enviroment variable value by an amount.',
    usage: 'name | amount?',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Amount',
            description: 'The amount to subtract.',
            optional: 'true',
            defaultValue: '1'
        }
    ],
    async run (d, name, amount = '1') {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!d.data.vars.has(name)) return new d.error('invalid', d, 'variable name', name)
        let envVar = d.data.vars.get(name)
        
        if (isNaN(amount)) return new d.error('invalid', d, 'amount number', amount)
        if (isNaN(envVar)) return new d.error('custom', d, 'variable is not a number')
            
        envVar = (Number(envVar) - Number(amount)).toString()
        d.data.vars.set(name, envVar)
    }
};