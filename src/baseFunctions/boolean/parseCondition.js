const { ConditionParser } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Parses a condition and return it result.',
    usage: 'condition',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to be parsed.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    dontUnescape: [1],
    run: async (d, condition) => {
        if (condition == undefined) return new d.error('required', d, 'condition')

        return ConditionParser.parse(d, condition);
    }
}