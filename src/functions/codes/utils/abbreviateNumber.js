module.exports = async d => {
    let [number, fractionDigits = 1] = d.func.params.splits;

    const tier = Math.floor(Math.log10(Math.abs(number || 1)) / 3);
    if (tier === 0) return number;

    const symbol = SI_SYMBOL[tier];
    const abbreviated = number / (Math.pow(10, tier * 3));
    
    return abbreviated.toFixed(fractionDigits) + symbol;
};