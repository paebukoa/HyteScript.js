module.exports = async d => {
    let [name] = d.func.params.splits;

    if (d.eventType !== 'interaction') return d.throwError.allow(d)
    if (!d.interaction.isCommand()) return d.throwError.func(d, `triggered interaction isn't a slash command interaction`)
    
    return d.slashOptions.get(name)?.value
};