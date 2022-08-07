module.exports = async (d, jsCode) => {
    let evaled = eval(jsCode)
    return typeof evaled == 'string' ? evaled : JSON.stringify(evaled, null, 2);
};