module.exports = async (d, jsCode) => {
    return JSON.stringify(eval(jsCode), null, 2);
};