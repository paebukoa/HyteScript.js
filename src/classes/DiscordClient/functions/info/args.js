const { escape } = require("../../utils/utils");

module.exports = {
    description: 'Returns an arg from the message which called the command. Using "all" in index parameter will make it return all args.',
    usage: 'index?',
    parameters: [
        {
            name: 'Index',
            description: 'The arg index.',
            optional: 'true',
            defaultValue: 'all'
        }
    ],
    run: async (d, index = 'all') => {
        if (!['default'].includes(d.eventType)) return new d.error("notAllowed", d, 'default type')
        
        if (index == undefined) return new d.error("required", d, 'index')

        if ((isNaN(index) || Number(index) === 0) && index.toLowerCase() !== 'all') return new d.error("invalid", d, 'element index', index);

        return escape(
            index.toLowerCase() === "all" ?
            d.args.join(" ")
            : Number(index) > 0 ?
            d.args.at(Number(index) - 1)
            : d.args.at(Number(index))
        );
    }
}