module.exports = async d => {
    let [id] = d.func.params.splits;

    let foundCommand = d.client.application.commands.cache.get(id)
    if (!foundCommand) return d.throwError.invalid(d, 'application command ID', id)

    foundCommand.delete()
};