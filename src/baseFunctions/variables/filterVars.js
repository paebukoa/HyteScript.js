const { clone, ConditionParser} = require("../../utils/BaseUtils");

module.exports = {
    description: 'Filter variables which mets to the condition.',
    usage: 'name | condition | dbName',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Condition',
            description: 'The condition to be parsed.',
            optional: 'false',
            defaultValue: 'none'
        },
		{
            name: 'dbName',
            description: 'The custom database name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
	dontParse: [1],
    run: async (d, name, condition, dbName, separator = ',') => {
		if (condition == undefined) return new d.error('required', d, 'condition')
		
	    let database = d.databases[dbName]
	
	    if (!database) return new d.error("invalid", d, 'database name', dbName)
	
	    if (database.entries[name] == undefined) return new d.error("custom", d, `entry "${name}" is not set in database "${dbName}"`)
			
		let filtereds = database.filter(async x => {
			let conditionData = clone(d)
	
			let placeholders = d.data.placeholders.slice(0)
			
			conditionData.data.placeholders.push({name: '{varValue}', value: x})
	
			let parsedCondition = await condition.parse(conditionData)
			d.err = conditionData.err
			if (d.err) return;
	
			d.data = conditionData.data
			d.data.placeholders = placeholders
	
			return ConditionParser.parse(d, parsedCondition.result)
		})
			
		
	    let result = []

		for (const filtered of filtereds) {
			let result = await filtered;
			result.push(result)
		}

		return result.join(separator)
	}
};