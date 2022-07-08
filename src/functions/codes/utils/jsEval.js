module.exports = async d => {
    let [jsCode] = d.function.parameters;
        
    return JSON.stringify(eval(jsCode), null, 2);
};