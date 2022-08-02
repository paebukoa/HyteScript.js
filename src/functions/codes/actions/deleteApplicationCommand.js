module.exports = {
    description: 'Deletes a application command by ID.',
    usage: 'id',
    parameters: [
        {
            name: 'ID',
            description: 'The application command ID.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, id) => {
        if (id == undefined) return d.throwError.required(d, 'application command ID')

        let foundCommand = d.client.application.commands.cache.get(id)
        if (!foundCommand) return d.throwError.invalid(d, 'application command ID', id)

        await foundCommand.delete().catch(e => d.throwError.func(d, e.message))
    }
}