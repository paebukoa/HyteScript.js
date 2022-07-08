module.exports = async d => {
    let [id] = d.function.parameters;

    let foundCommand = d.client.application.commands.cache.get(id)
    if (!foundCommand) return d.throwError.invalid(d, 'application command ID', id)

    foundCommand.delete()
};