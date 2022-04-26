module.exports = async d => {
    let [name] = d.func.params.splits;

    if (!['interaction', 'commandInteraction'].includes(d.eventType)) return d.throwError.allow(d)
    
    return d.slashOptions?.get?.(name)?.value
};