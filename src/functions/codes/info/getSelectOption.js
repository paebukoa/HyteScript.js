module.exports = async d => {
    let [index = '1'] = d.func.params.splits;

    if (!['interaction', 'selectMenuInteraction'].includes(d.eventType)) return d.throwError.allow(d)

    if (isNaN(index) || Number(index) < 1) return d.throwError.invalid(d, 'index', index);

    if (typeof d.value === 'string') return d.value
    else return d.value?.[Number(index) - 1]
};