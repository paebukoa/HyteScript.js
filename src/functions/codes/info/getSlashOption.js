module.exports = async d => {
    let [name] = d.function.parameters;

    if (!['interaction', 'commandInteraction'].includes(d.eventType)) return d.throwError.allow(d)
    
    return d.slashOptions?.get?.(name)?.value
};