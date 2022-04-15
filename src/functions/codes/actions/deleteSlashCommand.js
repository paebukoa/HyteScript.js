module.exports = async d => {
    let [id] = d.func.params.splits;

    let foundSlash = d.client.application.commands.cache.get(id)
    if (!foundSlash) return d.throwError.invalid(d, 'slash command ID', id)

    foundSlash.delete()
};