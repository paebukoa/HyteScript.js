module.exports = async d => {
    let [ms] = d.function.parameters;

    if (isNaN(ms) || Number(ms) < 1) return d.throwError.invalid(d, 'miliseconds', ms);
    
    await new Promise(resolve => setTimeout(resolve, ms));
};