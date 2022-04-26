module.exports = async d => {
    if (!['interaction', 'buttonInteraction', 'selectMenuInteraction'].includes(d.eventType)) return d.throwError.allow(d)

    return d.customId
};